'use strict';

(function () {
  // Отображает загруженное изображение
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  // Поле сохраняет масштаб изображения
  var scaleControlValue = document.querySelector('.scale__control--value');

  // Кнопки увеличения / уменьшения загруженного изображения
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');

  // Список эффектов для изображения
  var effectsList = document.querySelector('.effects__list');

  // Блок с ползунком для изменения уровень эффекта
  var effectLevel = document.querySelector('.effect-level');

  // Ползунок изменяющий уровень эффекта
  var effectLevelPin = document.querySelector('.effect-level__pin');

  // Поле сохраняет уровень эффекта установленный ползунком
  var effectLevelValue = document.querySelector('.effect-level__value');

  window.imageEffects = {
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
      window.functions.hideElement(effectLevel);

      var selectedEffect = 'none';

      effectsList.addEventListener('click', function (evt) {
        if (evt.target.matches('input[type="radio"]')) {
          window.imageEffects.removePictureEffects();
          imgUploadPreview.style.filter = null;
          selectedEffect = evt.target.value;
          effectLevelValue.value = 100;

          if (selectedEffect !== 'none') {
            window.functions.showElement(effectLevel);
            imgUploadPreview.classList.add('effects__preview--' + selectedEffect);
          } else {
            window.functions.hideElement(effectLevel);
          }
        }
      });

      effectLevelPin.addEventListener('mouseup', function (evt) {
        var lineWidth = 453;
        var pinX = evt.target.offsetLeft;
        var saturation = Math.round(pinX / lineWidth * 100);
        effectLevelValue.value = saturation;

        imgUploadPreview.style.filter = window.imageEffects.convertPercentsToCssEffect(saturation, selectedEffect);
      });
    }

  };

})();


