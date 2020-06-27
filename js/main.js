'use strict';

(function () {
  var onSuccessfulDataLoaded = function (serverData) {
    // Генерируем массив объектов изображений
    var allPhotos = window.data.getAllPhotos(serverData);

    // Рендерим миниатюры из массива объектов изображений
    window.thumbnails.renderPhotos(allPhotos);

    // Увеличиваем выбранную миниатюру по клику или нажатию Enter
    window.thumbnails.enlargePicture(allPhotos);
  };

  var onUnsuccessfulDataLoaded = function (errorCode, errorText) {
    throw new Error(window.serverErrors.getErrorByCode(errorCode, errorText));
  };

  window.server.getDataFromServer('https://javascript.pages.academy/kekstagram/data', onSuccessfulDataLoaded, onUnsuccessfulDataLoaded);

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


