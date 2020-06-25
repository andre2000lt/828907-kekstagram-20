'use strict';

(function () {
  // Поле загрузки изображения
  var uploadFile = document.querySelector('#upload-file');

  // Окно редактирования изображения
  var editImageForm = document.querySelector('.img-upload__overlay');

  // Отображает загруженное изображение
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  // Поле сохраняет масштаб изображения
  var scaleControlValue = document.querySelector('.scale__control--value');

  window.uploadImage = {
    // Обработчик нажатия клавиши ESC (Для закрытия формы редактирования картинки)
    onEditImageFormPressEsc: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.uploadImage.closeEditImageForm();
      }
    },

    // Открывает форму редактирования картинки
    openEditImageForm: function () {
      editImageForm.classList.remove('hidden');
      scaleControlValue.value = '100%';
      imgUploadPreview.style.transform = window.functions.intToScale(100);
      window.functions.toggleBodyClass('add');
      document.addEventListener('keydown', this.onEditImageFormPressEsc);
      window.imageEffects.returnDefaultParams();
    },

    // Закрывает форму редактирования картинки
    closeEditImageForm: function () {
      editImageForm.classList.add('hidden');
      window.functions.toggleBodyClass('remove');
      document.removeEventListener('keydown', this.onEditImageFormPressEsc);
      uploadFile.value = '';
      window.imageEffects.returnDefaultParams();
    }

  };

})();
