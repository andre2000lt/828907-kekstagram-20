'use strict';

(function () {
  // Поле загрузки изображения
  var uploadFile = document.querySelector('#upload-file');

  // Окно редактирования изображения
  var editImageForm = document.querySelector('.img-upload__overlay');

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
      window.form.clearTextFields();
    }

  };

})();
