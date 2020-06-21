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
      imgUploadPreview.style.transform = window.general.intToScale(100);
      window.general.toggleBodyClass('add');
      document.addEventListener('keydown', this.onEditImageFormPressEsc);
    },

    // Закрывает форму редактирования картинки
    closeEditImageForm: function () {
      editImageForm.classList.add('hidden');
      window.general.toggleBodyClass('remove');
      document.removeEventListener('keydown', this.onEditImageFormPressEsc);
      uploadFile.value = '';
    }

  };

})();
