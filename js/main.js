'use strict';

(function () {
  // Генерируем массив объектов изображений
  var allPhotos = window.data.getAllPhotos();

  // Рендерим миниатюры из массива объектов изображений
  window.thumbnails.renderPhotos(allPhotos);

  // Увеличиваем выбранную миниатюру по клику или нажатию Enter
  window.thumbnails.enlargePicture(allPhotos);

  // Открытие / Закрытие формы редактирования изображения
  // Поле загрузки изображения
  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', function () {
    window.uploadImage.openEditImageForm();
  });

  // Закрытие формы редактирования изображения
  // Кнопка закрытия окна редактирования изображения
  var uploadCancel = document.querySelector('#upload-cancel');
  uploadCancel.addEventListener('click', function () {
    window.uploadImage.closeEditImageForm();
  });

  // Изменение масштаба изображения
  window.imageEffects.changePictureScale();

  // Наложение эффектов на изображение
  window.imageEffects.putEffectOnPicture();

  // Валидация хэштегов
  window.form.checkHashtags();

  // Валидация описания изображения
  window.form.checkPhotoDescription(140);
})();


