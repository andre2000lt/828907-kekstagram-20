'use strict';

(function () {
  var DESCRIPTIONS = [
    'Отель Эдем',
    'Указатель',
    'Море',
    'Фотограф',
    'Суповые ванны',
    'Бэтмобиль',
    'Завтрак чемпиона',
    'Свежий кисель',
    'Машем самолету',
    'Обувь в кровати',
    'Песчаная тропа',
    'Зеленоглазое такси',
    'Не очень съедобное',
    'HotCat',
    'Илон Маск читает книгу',
    'Высоко над горами',
    'Урок музыки',
    'Последний экземпляр',
    'Тапки самосветы',
    'Красивый отель',
    'Маленькая порция',
    'Купаемся ночью',
    'Краб скрипач',
    'На концерте',
    'В мире животных'
  ];

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = [
    'Андрей',
    'Лена',
    'Катя',
    'Егор',
    'Федор',
    'Иван',
    'Антон',
    'Боря',
    'Максим',
    'Настя'
  ];

  var MIN_PHOTO_COMMENTS = 5;
  var MAX_PHOTO_COMMENTS = 15;

  window.data = {
    PHOTOS_COUNT: 25,

    // Возвращает сгенерированный путь к аватарке
    getAvatar: function () {
      var avatarIndex = window.functions.getRandomNumber(1, 6);
      return 'img/avatar-' + avatarIndex + '.svg';
    },

    // Возвращает сгенерированное имя
    getName: function () {
      var nameIndex = window.functions.getRandomNumber(0, NAMES.length - 1);
      return NAMES[nameIndex];
    },

    // Возвращает сгенерированный комментарий
    generateComment: function () {
      var messagesNumber = window.functions.getRandomNumber(1, 2);
      var comment = '';
      var commentsCopy = [];

      for (var i = 0; i < COMMENTS.length; i++) {
        commentsCopy[i] = COMMENTS[i];
      }

      for (var j = 0; j < messagesNumber; j++) {
        var messageIndex = window.functions.getRandomNumber(0, commentsCopy.length - 1);

        comment += ' ' + commentsCopy[messageIndex];
        commentsCopy.splice(messageIndex, 1);
      }

      return comment;
    },

    // Возвращаеет объект с текстом комментария, именем автора и ссылкой на аватар
    getPhotoComment: function () {
      var avatar = this.getAvatar();
      var name = this.getName();
      var comment = this.generateComment();
      var userComment = {
        avatar: avatar,
        messsage: comment,
        name: name,
      };

      return userComment;
    },

    // Генерирует массив объектов с комментариями к каждой фотографии
    getAllPhotosComments: function () {
      var photoComments = [];

      for (var i = 0; i < this.PHOTOS_COUNT; i++) {
        photoComments[i] = [];
        var currentPhotoCommentsCount = window.functions.getRandomNumber(MIN_PHOTO_COMMENTS, MAX_PHOTO_COMMENTS);
        for (var j = 0; j < currentPhotoCommentsCount; j++) {
          var currentComment = this.getPhotoComment();
          photoComments[i].push(currentComment);
        }
      }

      return photoComments;
    },

    // Возвращаеет объект фотографии с url, описанием, лайками, массивом объектов комментариев
    getPhoto: function (photoIndex, description, likes, comments) {
      var photoObj = {
        index: photoIndex,
        url: 'photos/' + photoIndex + '.jpg',
        description: description,
        likes: likes,
        comments: comments
      };

      return photoObj;
    },

    // Возвращаеет массив объектов всех фотографий
    getAllPhotos: function () {
      var allPhotos = [];
      for (var i = 0; i < this.PHOTOS_COUNT; i++) {
        var photoIndex = i + 1;
        var description = DESCRIPTIONS[i];
        var likes = window.functions.getRandomNumber(15, 200);
        var comments = this.getAllPhotosComments()[i];

        var currentPhoto = this.getPhoto(photoIndex, description, likes, comments);
        allPhotos[i] = currentPhoto;
      }

      return allPhotos;
    },

    // Ищет объект фотогравии в массиве по индексу
    findPictureById: function (arr, pictureId) {

      var checkId = function (currentElement) {
        return currentElement.index === parseInt(pictureId, 10);
      };

      var index = arr.findIndex(checkId);
      return index !== -1 ? index : 0;
    }

  };

})();
