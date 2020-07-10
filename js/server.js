'use strict';

(function () {
  window.server = {

    getData: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          onError(xhr.status, xhr.statusText);
        }

        onSuccess(xhr.response);
      });

      xhr.responseType = 'json';
      xhr.open('GET', url);
      xhr.send();
    },

    uploadData: function (url, data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          onError(xhr.status, xhr.statusText);
        }

        onSuccess(xhr.response);

      });

      xhr.open('POST', url);
      xhr.send(data);
    }

  };
})();
