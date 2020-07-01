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
    findPictureById: function (arr, pictureId) {

      var checkId = function (currentElement) {
        return currentElement.index === parseInt(pictureId, 10);
      };

      var index = arr.findIndex(checkId);
      return index !== -1 ? index : 0;
    },

    getRandomPhotos: function (photos) {
      var photosCopy = photos.slice();
      var newArray = [];
      for (var i = 0; i < 10; i++) {
        var index = window.functions.getRandomNumber(0, photosCopy.length - 1);
        newArray.push(photosCopy[index]);
        photosCopy.splice(index, 1);
      }

      return newArray;
    },

    sortPhotosByComments: function (photos) {
      var newArray = photos.slice()
      .sort(function (a, b) {
        var diff = b.comments.length - a.comments.length;
        if (diff === 0) {
          diff = b.likes - a.likes;
        }

        return diff;
      });

      return newArray;
    }

  };

})();
