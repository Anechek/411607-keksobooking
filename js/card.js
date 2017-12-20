'use strict';
window.card = (function () {
  var ESC_KEYCODE = 27;

  // Функция для обработчика события при клике popupCloseElement

  var onPopupCloseClick = function () {
    window.pin.removeActivePin();
    articleTempElement.setAttribute('hidden', '');
    document.removeEventListener('keydown', onAdvertEscPress);
  };

  // Функция для обработчика события при нажатии Esc

  var onAdvertEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      articleTempElement.setAttribute('hidden', '');
      window.pin.removeActivePin();
    }
  };

  var advertsTemplate = document.querySelector('template').content;
  var newElement = advertsTemplate.cloneNode(true);
  var mapElement = document.querySelector('.map');
  var filtersElement = document.querySelector('.map__filters-container');
  mapElement.insertBefore(newElement, filtersElement);

  // Убираем с экрана объявление, которое появляется в начале

  var articleTempElement = document.querySelector('article');
  articleTempElement.setAttribute('hidden', '');

  // Под объявлением оказался еще один баттон. Скрываем его тоже.

  var buttons = document.querySelectorAll('button.map__pin');
  buttons[buttons.length - 1].setAttribute('hidden', '');

  // Обаботчик события при клике popupCloseElement

  var popupCloseElement = articleTempElement.querySelector('.popup__close');
  popupCloseElement.addEventListener('click', onPopupCloseClick);

  return {

    onAdvertEscPress: onAdvertEscPress,

    addAdvertEscEvent: function () {
      document.addEventListener('keydown', onAdvertEscPress);
    },
    ESC_KEYCODE: ESC_KEYCODE,
    articleTempElement: articleTempElement,
    filtersElement: filtersElement
  };
})();
