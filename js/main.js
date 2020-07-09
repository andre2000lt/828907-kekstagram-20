'use strict';

(function () {
  var onSuccessLoad = function (serverData) {
    // Генерируем массив объектов изображений
    var allPhotos = window.data.getAllPhotos(serverData);

    // Рендерим миниатюры из массива объектов изображений
    window.thumbnails.renderPhotos(allPhotos);

    // Показываем фильтры фотографий на главной странице
    var imgFiltersBlock = document.querySelector('.img-filters');
    imgFiltersBlock.classList.remove('img-filters--inactive');

    var renderFilteredPhotos = window.debounce(function (evt) {
      var buttonId = evt.target.id;
      var filteredPhotos = '';

      switch (buttonId) {
        case 'filter-default':
          filteredPhotos = allPhotos;
          break;
        case 'filter-random':
          filteredPhotos = window.data.getRandomPhotos(allPhotos, 10);
          break;
        case 'filter-discussed':
          filteredPhotos = window.data.sortPhotosByComments(allPhotos);
          break;
        default:
          filteredPhotos = allPhotos;
          break;
      }

      // Рендерим миниатюры из массива объектов изображений
      window.thumbnails.renderPhotos(filteredPhotos);
    });

    var imgFilters = document.querySelector('.img-filters__form');
    imgFilters.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('img-filters__button')) {
        var filterButtons = imgFilters.querySelectorAll('.img-filters__button');
        filterButtons.forEach(function (button) {
          button.classList.remove('img-filters__button--active');
        });

        evt.target.classList.add('img-filters__button--active');

        renderFilteredPhotos(evt);
      }

    });
  };

  var onErrorLoad = function (errorCode, errorText) {
    throw new Error(window.serverErrors.getErrorByCode(errorCode, errorText));
  };

  var onSuccessUpload = function () {
    window.uploadImage.closeEditImageForm();
    window.uploadImage.showImgUploadSuccessMessage();
  };

  var onErrorUpload = function (errorCode, errorText) {
    window.uploadImage.closeEditImageForm();
    window.uploadImage.showImgUploadErrorMessage();
    throw new Error(window.serverErrors.getErrorByCode(errorCode, errorText));
  };

  window.server.getDataFromServer('https://javascript.pages.academy/kekstagram/data', onSuccessLoad, onErrorLoad);

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

  var imgUploadForm = document.querySelector('.img-upload__form');
  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var url = 'https://javascript.pages.academy/kekstagram';
    var formData = new FormData(imgUploadForm);
    window.server.uploadDataToServer(url, formData, onSuccessUpload, onErrorUpload);
  });

})();


