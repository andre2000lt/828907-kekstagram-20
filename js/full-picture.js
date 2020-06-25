'use strict';

(function () {
  // Модальное окно с изображением увеличенной миниатюры
  var bigPicture = document.querySelector('.big-picture');

  // Кнопка закрытия окна с изображением увеличенной миниатюры
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  window.fullPicture = {
    // Обработчик нажатия клавиши ESC - закрывает окно увеличенной миниатюры
    closeBigPictureOnEsc: function (evt) {
      if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
        window.functions.toggleBodyClass('remove');
        document.removeEventListener('keydown', this.closeBigPictureOnEsc);
      }
    },

    // Создает фрагмент с комментариями, аватарками и именами к увеличенной фотографии
    renderCommentsFragment: function (photo) {
      var commentsFragment = document.createDocumentFragment();

      var commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

      for (var i = 0; i < photo.comments.length; i++) {
        var comment = commentTemplate.cloneNode(true);
        var commentAvatar = comment.querySelector('img');
        var commetMessage = comment.querySelector('.social__text');

        commentAvatar.src = photo.comments[i].avatar;
        commentAvatar.alt = photo.comments[i].name;
        commetMessage.textContent = photo.comments[i].message;

        commentsFragment.appendChild(comment);
      }

      return commentsFragment;
    },

    // Отображает увеличенную фотографию со всей связанной информацией
    renderBigPhoto: function (photo) {
      bigPicture.classList.remove('hidden');

      var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
      var bigPictureLikes = bigPicture.querySelector('.likes-count');
      var bigPictureDescription = bigPicture.querySelector('.social__caption');
      var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
      var bigPictureComments = bigPicture.querySelector('.social__comments');

      bigPictureImg.src = photo.url;
      bigPictureLikes.textContent = photo.likes;
      bigPictureDescription.textContent = photo.description;

      bigPictureCommentsCount.textContent = photo.comments.length;
      bigPictureComments.textContent = '';
      bigPictureComments.appendChild(this.renderCommentsFragment(photo));

      var bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
      var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

      bigPictureCommentsCounter.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');

      window.functions.toggleBodyClass('add');

      bigPictureCancel.addEventListener('click', function () {
        bigPicture.classList.add('hidden');
        window.functions.toggleBodyClass('remove');
        document.removeEventListener('keydown', window.fullPicture.closeBigPictureOnEsc);
      });
    }

  };

})();
