'use strict';

(function () {
  var EFFECT_LINE_WIDTH = 453;

  // Отображает загруженное изображение
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  // Поле сохраняет масштаб изображения
  var scaleControlValue = document.querySelector('.scale__control--value');

  // Кнопки увеличения / уменьшения загруженного изображения
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  // Список эффектов для изображения
  var effectsList = document.querySelector('.effects__list');

  // Список эффектов для изображения
  var effectNoneRadio = document.querySelector('#effect-none');

  // Блок с ползунком для изменения уровень эффекта
  var effectLevel = document.querySelector('.effect-level');

  // Индикатор глубины уровня эффекта
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  // Ползунок изменяющий уровень эффекта
  var effectLevelPin = document.querySelector('.effect-level__pin');

  // Поле сохраняет уровень эффекта установленный ползунком
  var effectLevelValue = document.querySelector('.effect-level__value');

  var startX;

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;

    var newPinPosition = effectLevelPin.offsetLeft - shift;
    if (newPinPosition >= 0 && newPinPosition <= EFFECT_LINE_WIDTH) {
      effectLevelPin.style.left = newPinPosition + 'px';
      effectLevelDepth.style.width = newPinPosition + 'px';

      var saturation = Math.round((newPinPosition) / EFFECT_LINE_WIDTH * 100);
      effectLevelValue.value = saturation;

      imgUploadPreview.style.filter = window.imageEffects.convertPercentsToCssEffect(saturation, window.imageEffects.selectedEffect);
    }
  };

  window.imageEffects = {
    selectedEffect: 'none',

    // Управление масштабом картинки при помощи кнопок + / -
    changePictureScale: function () {
      scaleControlSmaller.addEventListener('click', function () {
        var integerValue = parseInt(scaleControlValue.value, 10);
        if (integerValue > 25) {
          integerValue -= 25;
          scaleControlValue.value = integerValue + '%';
          imgUploadPreview.style.transform = window.functions.intToScale(integerValue);
        }
      });

      scaleControlBigger.addEventListener('click', function () {
        var integerValue = parseInt(scaleControlValue.value, 10);
        if (integerValue < 76) {
          integerValue += 25;
          scaleControlValue.value = integerValue + '%';
          imgUploadPreview.style.transform = window.functions.intToScale(integerValue);
        }
      });
    },

    // Снимает все эффекты с imgUploadPreview
    removePictureEffects: function () {
      var effects = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
      for (var i = 0; i < effects.length; i++) {
        var effectClass = 'effects__preview--' + effects[i];
        imgUploadPreview.classList.remove(effectClass);
      }

      imgUploadPreview.style.filter = null;
      effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
      effectLevelDepth.style.width = EFFECT_LINE_WIDTH + 'px';
      effectLevelValue.value = 100;
    },

    returnDefaultParams: function () {
      window.imageEffects.removePictureEffects();
      window.imageEffects.selectedEffect = 'none';
      window.functions.hideElement(effectLevel);
      effectNoneRadio.checked = true;

      scaleControlValue.value = '100%';
      imgUploadPreview.style.transform = window.functions.intToScale(100);
    },

    // Конвертирует проценты в css свойство выбранного эффекта
    convertPercentsToCssEffect: function (percentValue, effectName) {
      var effectValue = 0;

      if (effectName === 'chrome') {
        effectValue = percentValue / 100;

        return 'grayscale(' + effectValue + ')';
      }

      if (effectName === 'sepia') {
        effectValue = percentValue / 100;

        return 'sepia(' + effectValue + ')';
      }

      if (effectName === 'marvin') {
        if (percentValue > 0) {
          effectValue = percentValue + '%';
        } else {
          effectValue = percentValue;
        }

        return 'invert(' + effectValue + ')';
      }

      if (effectName === 'phobos') {
        effectValue = percentValue * 3 / 100;
        effectValue += 'px';

        return 'blur(' + effectValue + ')';
      }

      if (effectName === 'heat') {
        effectValue = percentValue * 2 / 100 + 1;

        return 'brightness(' + effectValue + ')';
      }

      return 'none';
    },

    // Управление эффектами картинки imgUploadPreview
    putEffectOnPicture: function () {

      effectsList.addEventListener('click', function (evt) {
        if (evt.target.matches('input[type="radio"]')) {
          window.imageEffects.removePictureEffects();
          window.imageEffects.selectedEffect = evt.target.value;

          if (window.imageEffects.selectedEffect !== 'none') {
            window.functions.showElement(effectLevel);
            effectLevelPin.style.left = EFFECT_LINE_WIDTH + 'px';
            effectLevelDepth.style.width = EFFECT_LINE_WIDTH + 'px';

            imgUploadPreview.classList.add('effects__preview--' + window.imageEffects.selectedEffect);
          } else {
            window.functions.hideElement(effectLevel);
          }
        }
      });

      effectLevelPin.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        startX = evt.clientX;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }

  };

})();


