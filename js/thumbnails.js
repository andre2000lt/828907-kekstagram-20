'use strict';

(function () {
  // Миниатюры изображений на главной странице
  var thumbnails = document.querySelector('.pictures');

  window.thumbnails = {
    // Отображает на странице все фотографии с лайками и количеством комментариев
    renderPhotos: function (photosArr) {
      var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

      var picturesFragment = document.createDocumentFragment();

      for (var i = 0; i < window.data.PHOTOS_COUNT; i++) {
        var photo = photosArr[i];

        var picture = pictureTemplate.cloneNode(true);
        var pictureImg = picture.querySelector('.picture__img');
        var pictureComments = picture.querySelector('.picture__comments');
        var pictureLikes = picture.querySelector('.picture__likes');

        pictureImg.dataset.index = photo.index;
        pictureImg.src = photo.url;
        pictureComments.textContent = photo.comments.length;
        pictureLikes.textContent = photo.likes;

        picturesFragment.appendChild(picture);
      }

      var pictures = document.querySelector('.pictures');
      pictures.appendChild(picturesFragment);
    },

    // Увеличение миниатюр пользовательских фотографий на главной странице
    enlargePicture: function (allPhotos) {

      var enlargePictureOnEnter = function (evt) {
        if (evt.key === 'Enter') {
          var photo = evt.target.children[0];
          var pictureId = window.data.findPictureById(allPhotos, photo.dataset.index);
          window.fullPicture.renderBigPhoto(allPhotos[pictureId]);

          document.addEventListener('keydown', window.fullPicture.closeBigPictureOnEsc);
        }
      };

      thumbnails.addEventListener('focusin', function (evt) {
        if (evt.target.className === 'picture') {
          evt.target.addEventListener('keydown', enlargePictureOnEnter);
        }
      });

      thumbnails.addEventListener('focusout', function (evt) {
        evt.target.removeEventListener('keydown', enlargePictureOnEnter);
      });

      thumbnails.addEventListener('click', function (evt) {
        if (evt.target.className === 'picture__img') {
          var pictureId = window.data.findPictureById(allPhotos, evt.target.dataset.index);
          window.fullPicture.renderBigPhoto(allPhotos[pictureId]);

          document.addEventListener('keydown', window.fullPicture.closeBigPictureOnEsc);
        }
      });
    }

  };

})();


