'use strict';
window.card = (function () {
  var ESC_KEYCODE = 27;

  // Функция для обработчика события при клике popupClose

  var onPopupCloseClick = function () {
    window.pin.removeActivePin();
    articleTemp.setAttribute('hidden', '');
    document.removeEventListener('keydown', onAdvertEscPress);
  };

  // Функция для обработчика события при нажатии Esc

  var onAdvertEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      articleTemp.setAttribute('hidden', '');
      window.pin.removeActivePin();
    }
  };

  var advertsTemplate = document.querySelector('template').content;
  var newElement = advertsTemplate.cloneNode(true);
  var map = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');
  map.insertBefore(newElement, beforeElement);

  // Убираем с экрана объявление, которое появляется в начале

  var articleTemp = document.querySelector('article');
  articleTemp.setAttribute('hidden', '');

  // Под объявлением оказался еще один баттон. Скрываем его тоже.

  var buttonTemp = document.querySelectorAll('button.map__pin');
  buttonTemp[buttonTemp.length - 1].setAttribute('hidden', '');

  // Обаботчик события при клике popupClose

  var popupClose = articleTemp.querySelector('.popup__close');
  popupClose.addEventListener('click', onPopupCloseClick);

  return {
    // addAdvertOnMap: addAdvertOnMap,

    addAdvertEscEvent: function () {
      document.addEventListener('keydown', onAdvertEscPress);
    },

    articleTemp: articleTemp
  };
})();
