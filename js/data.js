'use strict';
window.data = (function () {

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
    var strongElement = document.createElement('strong');
    strongElement.textContent = errorMessage;
    errorDivElement.appendChild(strongElement);
    var pElement = document.createElement('p');
    pElement.textContent = 'Убрать сообщение об ошибке - ESC';
    pElement.style = 'font-size: 15px';
    errorDivElement.appendChild(pElement);
    errorDivElement.removeAttribute('hidden', '');
    document.removeEventListener('keydown', window.card.onAdvertEscPress);
    document.addEventListener('keydown', onErrorDivEscPress);
  };

  // Функция заполнения массива объявлений, взятых с сервера

  var getArrayAdverts = function () {
    window.backend.load(function (response) {
      window.data.adverts = response;
    }, onErrorLoadSave);
  };

  var adverts = [];
  getArrayAdverts();

  // Создадим DOM-элемент для отображения сообщения об ошибке.

  var errorDivElement = document.createElement('div');
  errorDivElement.style = 'z-index: 100; padding: 15px; border: 1px solid #E32636; border-radius: 4px; color: #E32636; background-color: #FFC0CB; font-size: 25px';
  errorDivElement.style.textAlign = 'center';
  errorDivElement.style.margin = 'auto';
  errorDivElement.style.position = 'fixed';
  errorDivElement.style.left = 0;
  errorDivElement.style.right = 0;
  errorDivElement.style.top = '200px';
  errorDivElement.style.width = '40%';
  errorDivElement.setAttribute('hidden', '');
  document.body.appendChild(errorDivElement);

  return {
    adverts: adverts,
    onErrorLoadSave: onErrorLoadSave
  };
})();
