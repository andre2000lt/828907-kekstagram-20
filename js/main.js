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

var body = document.querySelector('body');

// Окно редактирования изображения
var editImageForm = document.querySelector('.img-upload__overlay');

// Поле загрузки изображения
var uploadFile = document.querySelector('#upload-file');

// Кнопка закрытия окна редактирования изображения
var uploadCancel = document.querySelector('#upload-cancel');

// Отображает загруженное изображение
var imgUploadPreview = document.querySelector('.img-upload__preview');

// Кнопки увеличения / уменьшения загруженного изображения
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');

// Поле сохраняет масштаб изображения
var scaleControlValue = document.querySelector('.scale__control--value');

// Список эффектов для изображения
var effectsList = document.querySelector('.effects__list');

// Блок с ползунком для изменения уровень эффекта
var effectLevel = document.querySelector('.effect-level');

// Ползунок изменяющий уровень эффекта
var effectLevelPin = document.querySelector('.effect-level__pin');

// Поле сохраняет уровень эффекта установленный ползунком
var effectLevelValue = document.querySelector('.effect-level__value');

// Поле для ввода хэштегов загруженной фотографии
var textHashtags = document.querySelector('.text__hashtags');

// Поле для ввода описания загруженной фотографии
var textDescription = document.querySelector('.text__description');

// Миниатюры изображений на главной странице
var thumbnails = document.querySelector('.pictures');

// Модальное окно с изображением увеличенной миниатюры
var bigPicture = document.querySelector('.big-picture');

// Кнопка закрытия окна с изображением увеличенной миниатюры
var bigPictureCancel = document.querySelector('.big-picture__cancel');


// Добавляет или удаляет body класс modal-open
var toggleBodyClass = function (action) { // action = {add, remove}
  if (action === 'add') {
    if (!body.classList.contains('modal-open')) {
      body.classList.add('modal-open');
    }
  } else {
    body.classList.remove('modal-open');
  }
};

// Возвращает случайное число от min до max
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

// Возвращает сгенерированный путь к аватарке
var getAvatar = function () {
  var avatarIndex = getRandomNumber(1, 6);
  return 'img/avatar-' + avatarIndex + '.svg';
};

// Возвращает сгенерированное имя
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
    index: photoIndex,
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
var renderPhotos = function (photosArr) {
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

  var picturesFragment = document.createDocumentFragment();

  for (var i = 0; i < PHOTOS_COUNT; i++) {
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
  bigPicture = document.querySelector('.big-picture');
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

  toggleBodyClass('add');
};

// Обработчик нажатия клавиши ESC (Для закрытия формы редактирования картинки)
var onEditImageFormPressEsc = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditImageForm();
  }
};

// Открывает форму редактирования картинки
var openEditImageForm = function () {
  editImageForm.classList.remove('hidden');
  scaleControlValue.value = '100%';
  imgUploadPreview.style.transform = intToScale(100);
  toggleBodyClass('add');
  document.addEventListener('keydown', onEditImageFormPressEsc);
};

// Закрывает форму редактирования картинки
var closeEditImageForm = function () {
  editImageForm.classList.add('hidden');
  toggleBodyClass('remove');
  document.removeEventListener('keydown', onEditImageFormPressEsc);
  uploadFile.value = '';
};

// Преобразует число в css свойство scale
var intToScale = function (intValue) {
  if (intValue > 100) {
    intValue = 100;
  }

  if (intValue < 0) {
    intValue = 0;
  }

  if (intValue !== 100) {
    return 'scale(0.' + intValue + ')';
  } else {
    return 'scale(1)';
  }
};

// Управление масштабом картинки при помощи кнопок + / -
var changePictureScale = function () {
  scaleControlValue.value = '100%';

  scaleControlSmaller.addEventListener('click', function () {
    var integerValue = parseInt(scaleControlValue.value, 10);
    if (integerValue > 25) {
      integerValue -= 25;
      scaleControlValue.value = integerValue + '%';
      imgUploadPreview.style.transform = intToScale(integerValue);
    }
  });

  scaleControlBigger.addEventListener('click', function () {
    var integerValue = parseInt(scaleControlValue.value, 10);
    if (integerValue < 76) {
      integerValue += 25;
      scaleControlValue.value = integerValue + '%';
      imgUploadPreview.style.transform = intToScale(integerValue);
    }
  });
};

// Добавляет элементу element класс visually-hidden
var hideElement = function (element) {
  if (!element.classList.contains('visually-hidden')) {
    element.classList.add('visually-hidden');
  }
};

// Удаляет у элемента element класс visually-hidden
var showElement = function (element) {
  element.classList.remove('visually-hidden');
};

// Снимает все эффекты с imgUploadPreview
var removePictureEffects = function () {
  var effects = ['chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  for (var i = 0; i < effects.length; i++) {
    var effectClass = 'effects__preview--' + effects[i];
    imgUploadPreview.classList.remove(effectClass);
  }
};

// Конвертирует проценты в css свойство выбранного эффекта
var convertPercentsToCssEffect = function (percentValue, effectName) {
  var effectValue = 0;

  if (effectName === 'chrome') {
    effectValue = percentValue / 100;

    return 'grayscale(' + effectValue + ')';
  }

  if (effectName === 'sepia') {
    effectValue = percentValue / 100;

    return 'sepia(' + effectValue + ')';
  }

  if (effectName === 'marvin') {
    if (percentValue > 0) {
      effectValue = percentValue + '%';
    } else {
      effectValue = percentValue;
    }

    return 'invert(' + effectValue + ')';
  }

  if (effectName === 'phobos') {
    effectValue = percentValue * 3 / 100;
    effectValue += 'px';

    return 'blur(' + effectValue + ')';
  }

  if (effectName === 'heat') {
    effectValue = percentValue * 2 / 100 + 1;

    return 'brightness(' + effectValue + ')';
  }

  return 'none';
};

// Управление эффектами картинки imgUploadPreview
var putEffectOnPicture = function () {
  hideElement(effectLevel);

  var selectedEffect = 'none';

  effectsList.addEventListener('click', function (evt) {
    if (evt.target.matches('input[type="radio"]')) {
      removePictureEffects();
      imgUploadPreview.style.filter = null;
      selectedEffect = evt.target.value;
      effectLevelValue.value = 100;

      if (selectedEffect !== 'none') {
        showElement(effectLevel);
        imgUploadPreview.classList.add('effects__preview--' + selectedEffect);
      } else {
        hideElement(effectLevel);
      }
    }
  });

  effectLevelPin.addEventListener('mouseup', function (evt) {
    var lineWidth = 453;
    var pinX = evt.target.offsetLeft;
    var saturation = Math.round(pinX / lineWidth * 100);
    effectLevelValue.value = saturation;

    imgUploadPreview.style.filter = convertPercentsToCssEffect(saturation, selectedEffect);
  });
};

// Ищет одинаковые строки в массиве
var checkSameHashtags = function (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      var hTagRe = new RegExp('^' + arr[i] + '$', 'i');
      if (hTagRe.test(arr[j])) {
        return true;
      }
    }
  }

  return false;
};

// Валидация введеных хэштегов
var checkHashtags = function () {
  textHashtags.addEventListener('input', function () {
    var hashTegRe = /^#[0-9a-zA-Zа-яА-я]{1,19}$/;
    var hashTagsErrorCount = 0;

    var text = textHashtags.value.trim();
    if (text) {
      var hashtagsArray = text.split(' ');

      for (var i = 0; i < hashtagsArray.length; i++) {
        if (!hashTegRe.test(hashtagsArray[i])) {
          hashTagsErrorCount++;
        }
      }

      if (hashTagsErrorCount) {
        textHashtags.setCustomValidity('Исправьте ошибки в ' + hashTagsErrorCount + ' хэштеге');
        textHashtags.reportValidity();
      } else if (hashtagsArray.length > 5) {
        textHashtags.setCustomValidity('Не больше 5 хэштегов');
        textHashtags.reportValidity();
      } else if (checkSameHashtags(hashtagsArray)) {
        textHashtags.setCustomValidity('Удалите одинаковые хэштеги');
        textHashtags.reportValidity();
      } else {
        textHashtags.setCustomValidity('');
      }
    } else {
      textHashtags.setCustomValidity('');
    }
  });

  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEditImageFormPressEsc);
  });

  textHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onEditImageFormPressEsc);
  });
};

// Проверяет введеное описание к изображению на количество символов
var checkPhotoDescription = function (simbolCount) {
  textDescription.addEventListener('input', function () {
    var text = textDescription.value;
    var extraSimbols = 0;

    if (text) {
      if (text.length > simbolCount) {
        extraSimbols = text.length - simbolCount;
        textDescription.setCustomValidity('Удалите лишние ' + extraSimbols + ' символов');
        textDescription.reportValidity();
      }
    } else {
      textDescription.setCustomValidity('');
    }
  });

  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEditImageFormPressEsc);
  });

  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onEditImageFormPressEsc);
  });
};

// Ищет объект фотогравии в массиве по индексу
var findPictureById = function (arr, pictureId) {

  var checkId = function (currentElement) {
    return currentElement.index === parseInt(pictureId, 10);
  };

  var index = arr.findIndex(checkId);
  return index !== -1 ? index : 0;
};

// Увеличение миниатюр пользовательских фотографий при нажатии Enter
var enlargePictureOnEnter = function (evt) {
  if (evt.key === 'Enter') {
    var photo = evt.target.children[0];
    var pictureId = findPictureById(allPhotos, photo.dataset.index);
    renderBigPhoto(allPhotos[pictureId]);

    document.addEventListener('keydown', closeBigPictureOnEsc);
  }
};

// Обработчик нажатия клавиши ESC - закрывает окно увеличенной миниатюры
var closeBigPictureOnEsc = function (evt) {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    toggleBodyClass('remove');
    document.removeEventListener('keydown', closeBigPictureOnEsc);
  }
};

// Увеличение миниатюр пользовательских фотографий на главной странице
var enlargePicture = function () {
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
      var pictureId = findPictureById(allPhotos, evt.target.dataset.index);
      renderBigPhoto(allPhotos[pictureId]);

      document.addEventListener('keydown', closeBigPictureOnEsc);
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
    toggleBodyClass('remove');
    document.removeEventListener('keydown', closeBigPictureOnEsc);
  });
};

// Генерируем массив объектов изображений
var allPhotos = getAllPhotos();

// Рендерим миниатюры из массива объектов изображений
renderPhotos(allPhotos);

// Увеличиваем выбранную миниатюру по клику или нажатию Enter
enlargePicture();

// Открытие / Закрытие формы редактирования изображения
uploadFile.addEventListener('change', function () {
  openEditImageForm();
});

uploadCancel.addEventListener('click', function () {
  closeEditImageForm();
});

// Изменение масштаба изображения
changePictureScale();

// Наложение эффектов на изображение
putEffectOnPicture();

// Валидация хэштегов
checkHashtags();

// Валидация описания изображения
checkPhotoDescription(140);
