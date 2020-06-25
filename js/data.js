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
    PHOTOS_COUNT: 25,

    // Возвращаеет массив объектов всех фотографий
    getAllPhotos: function (serverData) {
      var data = improveServerData(serverData);
      return data;
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
