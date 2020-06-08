'use strict';

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

var PHOTOS_COUNT = 25;
var MIN_PHOTO_COMMENTS = 5;
var MAX_PHOTO_COMMENTS = 15;

var getRandomNumber = function (min, max) {
  if (min === max) {
    return min;
  }

  if (min > max) {
    var n = min;
    min = max;
    max = n;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatar = function () {
  var avatarIndex = getRandomNumber(1, 6);
  return 'img/avatar-' + avatarIndex + '.svg';
};

var getName = function () {
  var nameIndex = getRandomNumber(0, NAMES.length - 1);
  return NAMES[nameIndex];
};

// Возвращает сгенерированный комментарий
var generateComment = function () {
  var messagesNumber = getRandomNumber(1, 2);
  var comment = '';
  var commentsCopy = [];

  for (var i = 0; i < COMMENTS.length; i++) {
    commentsCopy[i] = COMMENTS[i];
  }

  for (var j = 0; j < messagesNumber; j++) {
    var messageIndex = getRandomNumber(0, commentsCopy.length - 1);

    comment += ' ' + commentsCopy[messageIndex];
    commentsCopy.splice(messageIndex, 1);
  }

  return comment;
};

// Возвращаеет объект с текстом комментария, именем автора и ссылкой на аватар
var getPhotoComment = function () {
  var avatar = getAvatar();
  var name = getName();
  var comment = generateComment();
  var userComment = {
    avatar: avatar,
    messsage: comment,
    name: name,
  };

  return userComment;
};

// Генерирует массив объектов с комментариями к каждой фотографии
var getAllPhotosComments = function () {
  var photoComments = [];

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photoComments[i] = [];
    var currentPhotoCommentsCount = getRandomNumber(MIN_PHOTO_COMMENTS, MAX_PHOTO_COMMENTS);
    for (var j = 0; j < currentPhotoCommentsCount; j++) {
      var currentComment = getPhotoComment();
      photoComments[i].push(currentComment);
    }
  }

  return photoComments;
};

// Возвращаеет объект фотографии с url, описанием, лайками, массивом объектов комментариев
var getPhoto = function (photoIndex, description, likes, comments) {
  var photoObj = {
    url: 'photos/' + photoIndex + '.jpg',
    description: description,
    likes: likes,
    comments: comments
  };

  return photoObj;
};

// Возвращаеет массив объектов всех фотографий
var getAllPhotos = function () {
  var allPhotos = [];
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var photoIndex = i + 1;
    var description = DESCRIPTIONS[i];
    var likes = getRandomNumber(15, 200);
    var comments = getAllPhotosComments()[i];

    var currentPhoto = getPhoto(photoIndex, description, likes, comments);
    allPhotos[i] = currentPhoto;
  }

  return allPhotos;
};

// Отображает на странице все фотографии с лайками и количеством комментариев
var renderPhotos = function (photosMas) {
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picturesFragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var photo = photosMas[i];

    var picture = pictureTemplate.cloneNode(true);
    var pictureImg = picture.querySelector('.picture__img');
    var pictureComments = picture.querySelector('.picture__comments');
    var pictureLikes = picture.querySelector('.picture__likes');

    pictureImg.src = photo.url;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;

    picturesFragment.appendChild(picture);
  }

  var pictures = document.querySelector('.pictures');
  pictures.appendChild(picturesFragment);
};

// Создает фрагмент с комментариями, аватарками и именами к увеличенной фотографии
var renderCommentsFragment = function (photo) {
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
    commetMessage.textContent = photo.comments[i].messsage;

    commentsFragment.appendChild(comment);
  }

  return commentsFragment;
};

// Отображает увеличенную фотографию со всей связанной информацией
var renderBigPhoto = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
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
  bigPictureComments.appendChild(renderCommentsFragment(photo));

  var bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  bigPictureCommentsCounter.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
};

var allPhotos = getAllPhotos();
renderPhotos(allPhotos);
renderBigPhoto(allPhotos[0]);

var body = document.querySelector('body');
body.classList.add('modal-open');
