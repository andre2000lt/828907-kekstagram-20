'use strict';

(function () {

  // Добавляет во все объекты массива свойство index
  var improveServerData = function (serverData) {
    for (var i = 0; i < serverData.length; i++) {
      serverData[i].index = i + 1;
    }

    return serverData;
  };

  window.data = {
    // Возвращаеет массив объектов всех фотографий
    getAllPhotos: function (serverData) {
      return improveServerData(serverData);
    },

    // Ищет объект фотогравии в массиве по индексу
    findPictureById: function (pictures, pictureId) {

      var checkId = function (currentElement) {
        return currentElement.index === parseInt(pictureId, 10);
      };

      var index = pictures.findIndex(checkId);
      return index !== -1 ? index : 0;
    },

    getRandomPhotos: function (photos, photosCount) {
      var duplicatedPhotos = photos.slice();
      var randomPhotos = [];
      for (var i = 0; i < photosCount; i++) {
        var index = window.functions.getRandomNumber(0, duplicatedPhotos.length - 1);
        randomPhotos.push(duplicatedPhotos[index]);
        duplicatedPhotos.splice(index, 1);
      }

      return randomPhotos;
    },

    sortPhotosByComments: function (photos) {
      var duplicatedPhotos = photos.slice()
      .sort(function (a, b) {
        var difference = b.comments.length - a.comments.length;
        if (difference === 0) {
          difference = b.likes - a.likes;
        }

        return difference;
      });

      return duplicatedPhotos;
    }

  };

})();
