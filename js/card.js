'use strict';
(function () {
  var ESC_KEYCODE = 27;

  // Функция для обработчика события при клике popupCloseElement

  var onPopupCloseClick = function () {
    window.pin.removeActive();
    articleTempElement.setAttribute('hidden', '');
    document.removeEventListener('keydown', onAdvertEscPress);
  };

  // Функция для обработчика события при нажатии Esc

  var onAdvertEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      articleTempElement.setAttribute('hidden', '');
      window.pin.removeActive();
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

  var buttonElements = document.querySelectorAll('button.map__pin');
  buttonElements[buttonElements.length - 1].setAttribute('hidden', '');

  // Обаботчик события при клике popupCloseElement

  var popupCloseElement = articleTempElement.querySelector('.popup__close');
  popupCloseElement.addEventListener('click', onPopupCloseClick);

  window.card = {
    ESC_KEYCODE: ESC_KEYCODE,
    articleTempElement: articleTempElement,
    filtersElement: filtersElement,

    onAdvertEscPress: onAdvertEscPress,

    addAdvertEscEvent: function () {
      document.addEventListener('keydown', onAdvertEscPress);
    }
  };
})();
