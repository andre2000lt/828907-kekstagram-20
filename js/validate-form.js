'use strict';

(function () {
  // Поле для ввода хэштегов загруженной фотографии
  var textHashtags = document.querySelector('.text__hashtags');

  // Поле для ввода описания загруженной фотографии
  var textDescription = document.querySelector('.text__description');

  window.validateForm = {
    // Валидация введеных хэштегов
    checkHashtags: function () {
      textHashtags.addEventListener('input', function () {
        var hashTegRe = /^#[0-9a-zA-Zа-яА-я]{1,19}$/;
        var hashTagsErrorCount = 0;

        var text = textHashtags.value.trim();
        if (text) {
          var hashtagsArray = text.split(' ');

          for (var i = 0; i < hashtagsArray.length; i++) {
            if (!hashTegRe.test(hashtagsArray[i])) {
              hashTagsErrorCount++;
            }
          }

          if (hashTagsErrorCount) {
            textHashtags.setCustomValidity('Исправьте ошибки в ' + hashTagsErrorCount + ' хэштеге');
            textHashtags.reportValidity();
          } else if (hashtagsArray.length > 5) {
            textHashtags.setCustomValidity('Не больше 5 хэштегов');
            textHashtags.reportValidity();
          } else if (window.general.checkSameHashtags(hashtagsArray)) {
            textHashtags.setCustomValidity('Удалите одинаковые хэштеги');
            textHashtags.reportValidity();
          } else {
            textHashtags.setCustomValidity('');
          }
        } else {
          textHashtags.setCustomValidity('');
        }
      });

      textHashtags.addEventListener('focus', function () {
        document.removeEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });

      textHashtags.addEventListener('blur', function () {
        document.addEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });
    },

    // Проверяет введеное описание к изображению на количество символов
    checkPhotoDescription: function (simbolCount) {
      textDescription.addEventListener('input', function () {
        var text = textDescription.value;
        var extraSimbols = 0;

        if (text) {
          if (text.length > simbolCount) {
            extraSimbols = text.length - simbolCount;
            textDescription.setCustomValidity('Удалите лишние ' + extraSimbols + ' символов');
            textDescription.reportValidity();
          }
        } else {
          textDescription.setCustomValidity('');
        }
      });

      textDescription.addEventListener('focus', function () {
        document.removeEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });

      textDescription.addEventListener('blur', function () {
        document.addEventListener('keydown', window.uploadImage.onEditImageFormPressEsc);
      });
    }
  };

})();


