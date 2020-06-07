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
var MAX_PHOTO_COMMENTS = 5;

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

var getAllPhotosComments = function () {

  var photoComments = [];

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photoComments[i] = [];
    var currentPhotoCommentsCount = getRandomNumber(0, MAX_PHOTO_COMMENTS);
    for (var j = 0; j < currentPhotoCommentsCount; j++) {
      var currentComment = getPhotoComment();
      photoComments[i].push(currentComment);
    }
  }

  return photoComments;
};

var getPhoto = function (photoIndex, description, likes, comments) {
  var photoObj = {
    url: 'photos/' + photoIndex + '.jpg',
    description: description,
    likes: likes,
    comments: comments
  };

  return photoObj;
};

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

var renderPhotos = function (photosMas) {
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picturesFragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var pictureParams = photosMas[i];
    var pictureParamSrc = pictureParams.url;
    var pictureParamLikes = pictureParams.likes;
    var pictureParamComments = pictureParams.comments;
    var pictureParamCommentsCount = pictureParamComments.length;

    var picture = pictureTemplate.cloneNode(true);
    var pictureImg = picture.querySelector('.picture__img');
    var pictureComments = picture.querySelector('.picture__comments');
    var pictureLikes = picture.querySelector('.picture__likes');

    pictureImg.src = pictureParamSrc;
    pictureComments.textContent = pictureParamCommentsCount;
    pictureLikes.textContent = pictureParamLikes;

    picturesFragment.appendChild(picture);
  }

  var pictures = document.querySelector('.pictures');
  pictures.appendChild(picturesFragment);
};

var allPhotos = getAllPhotos();
renderPhotos(allPhotos);
