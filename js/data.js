'use strict';
(function () {

  // Функция для обработки нажатия кавиши ESC для закрытия сообщения об ошибке

  var onErrorDivEscPress = function (evt) {
    if (evt.keyCode === window.card.ESC_KEYCODE) {
      errorDivElement.setAttribute('hidden', '');
      document.removeEventListener('keydown', onErrorDivEscPress);
      window.card.addAdvertEscEvent();
    }
  };

  // При возникновении ошибки во время получения и отправки на сервер

  var onErrorLoadSave = function (errorMessage) {
    strongElement.textContent = errorMessage;
    errorDivElement.removeAttribute('hidden', '');
    document.removeEventListener('keydown', window.card.onAdvertEscPress);
    document.addEventListener('keydown', onErrorDivEscPress);
  };

  // Функция заполнения массива объявлений, взятых с сервера

  var getArrayAdverts = function () {
    window.server.load(function (response) {
      window.data.adverts = response;
    }, onErrorLoadSave);
  };

  var adverts = [];
  getArrayAdverts();

  // Создадим DOM-элемент для отображения сообщения об ошибке.

  var errorDivElement = document.createElement('div');
  errorDivElement.style.zIndex = 100;
  errorDivElement.style.padding = '15px';
  errorDivElement.style.border = '1px solid #E32636';
  errorDivElement.style.borderRadius = '4px';
  errorDivElement.style.color = '#E32636';
  errorDivElement.style.backgroundColor = '#FFC0CB';
  errorDivElement.style.fontSize = '25px';
  errorDivElement.style.textAlign = 'center';
  errorDivElement.style.margin = 'auto';
  errorDivElement.style.position = 'fixed';
  errorDivElement.style.left = 0;
  errorDivElement.style.right = 0;
  errorDivElement.style.top = '200px';
  errorDivElement.style.width = '40%';
  errorDivElement.setAttribute('hidden', '');
  var strongElement = document.createElement('strong');
  errorDivElement.appendChild(strongElement);
  var paragraphElement = document.createElement('p');
  paragraphElement.textContent = 'Убрать сообщение об ошибке - ESC';
  paragraphElement.style.fontSize = '15px';
  errorDivElement.appendChild(paragraphElement);
  document.body.appendChild(errorDivElement);

  window.data = {
    adverts: adverts,

    onErrorLoadSave: onErrorLoadSave
  };
})();
