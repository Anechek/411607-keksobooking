'use strict';
window.data = (function () {

  // Функция для обработки нажатия кавиши ESC для закрытия сообщения об ошибке

  var onErrorDivEscPress = function (evt) {
    if (evt.keyCode === window.card.ESC_KEYCODE) {
      errorDiv.setAttribute('hidden', '');
      document.removeEventListener('keydown', onErrorDivEscPress);
      window.card.addAdvertEscEvent();
    }
  };

  // При возникновении ошибки во время получения и отправки на сервер

  var onErrorLoadSave = function (errorMessage) {
    errorDiv.innerHTML = '<strong>' + errorMessage + '</strong></br><p style = \'font-size: 13px;\'>Убрать сообщение об ошибке - ESC';
    errorDiv.removeAttribute('hidden', '');
    document.removeEventListener('keydown', window.card.onAdvertEscPress);
    document.addEventListener('keydown', onErrorDivEscPress);
  };

  // Функция заполнения массива объявлений, взятых с сервера

  var getArrayAdverts = function () {
    window.backend.load(function (response) {

      // Вопрос наставнику! Вот в этом месте не могу избвиться от глобальной переменной. 

      window.data.adverts = response;
    }, onErrorLoadSave);
  };

  var adverts = [];
  getArrayAdverts();

  // Создадим DOM-элемент для отображения сообщения об ошибке.

  var errorDiv = document.createElement('div');
  errorDiv.style = 'z-index: 100; padding: 15px; border: 1px solid #E32636; border-radius: 4px; color: #E32636; background-color: #FFC0CB; font-size: 20px';
  errorDiv.style.textAlign = 'center';
  errorDiv.style.margin = 'auto';
  errorDiv.style.position = 'fixed';
  errorDiv.style.left = 0;
  errorDiv.style.right = 0;
  errorDiv.style.top = '200px';
  errorDiv.style.width = '50%';
  errorDiv.setAttribute('hidden', '');
  document.body.appendChild(errorDiv);

  return {
    adverts: adverts,
    onErrorLoadSave: onErrorLoadSave
  };
})();
