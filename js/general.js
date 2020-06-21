'use strict';

(function () {
  var body = document.querySelector('body');

  window.general = {
    // Возвращает случайное число от min до max
    getRandomNumber: function (min, max) {
      if (min === max) {
        return min;
      }

      if (min > max) {
        var n = min;
        min = max;
        max = n;
      }
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Ищет одинаковые строки в массиве
    checkSameHashtags: function (arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          var re = new RegExp('^' + arr[i] + '$', 'i');
          if (re.test(arr[j])) {
            return true;
          }
        }
      }

      return false;
    },

    // Добавляет или удаляет body класс modal-open
    toggleBodyClass: function (action) { // action = {add, remove}
      if (action === 'add') {
        if (!body.classList.contains('modal-open')) {
          body.classList.add('modal-open');
        }
      } else {
        body.classList.remove('modal-open');
      }
    },

    // Преобразует число в css свойство scale
    intToScale: function (intValue) {
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
    },

    // Добавляет элементу element класс visually-hidden
    hideElement: function (element) {
      if (!element.classList.contains('visually-hidden')) {
        element.classList.add('visually-hidden');
      }
    },

    // Удаляет у элемента element класс visually-hidden
    showElement: function (element) {
      element.classList.remove('visually-hidden');
    }

  };

})();


