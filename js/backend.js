'use strict';
(function () {
  var LOAD_URL = 'https://1510.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://1510.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  window.backend = {

    // Функция загрузки с сервера

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    // Функция сохранения на сервер

    save: function (data, onSave, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSave(xhr.response);
        } else {
          onError('Ошибка при отправке: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }
  };
})();
