'use strict';

(function () {
  var xhr = new XMLHttpRequest();

  window.server = {

    getDataFromServer: function (url, onSuccess, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          onError(xhr.status, xhr.statusText);
        } else {
          onSuccess(xhr.response);
        }
      });

      xhr.responseType = 'json';
      xhr.open('GET', url);
      xhr.send();
    }

  };
})();
