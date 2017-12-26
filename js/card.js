'use strict';
(function () {
  var ESC_KEYCODE = 27;

  // Функция для обработчика события при клике popupCloseElement

  var onPopupCloseClick = function () {
    window.pin.removeActive();
    articleElement.setAttribute('hidden', '');
    document.removeEventListener('keydown', onAdvertEscPress);
  };

  // Функция для обработчика события при нажатии Esc

  var onAdvertEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      articleElement.setAttribute('hidden', '');
      window.pin.removeActive();
    }
  };

  var advertsTemplate = document.querySelector('template').content;
  var articleTemplateElement = advertsTemplate.querySelector('article');

  // Убираем с экрана объявление, которое появляется в начале

  articleTemplateElement.setAttribute('hidden', '');

  // Под объявлением оказался еще один баттон. Скрываем его тоже.

  var buttonElement = advertsTemplate.querySelector('button.map__pin');
  buttonElement.setAttribute('hidden', '');

  var newElement = advertsTemplate.cloneNode(true);
  var mapElement = document.querySelector('.map');
  var filtersElement = document.querySelector('.map__filters-container');
  mapElement.insertBefore(newElement, filtersElement);

  var articleElement = document.querySelector('article');

  // Обаботчик события при клике popupCloseElement

  var popupCloseElement = articleElement.querySelector('.popup__close');
  popupCloseElement.addEventListener('click', onPopupCloseClick);

  window.card = {
    ESC_KEYCODE: ESC_KEYCODE,
    articleElement: articleElement,
    filtersElement: filtersElement,
    buttonElement: buttonElement,

    onAdvertEscPress: onAdvertEscPress,

    addAdvertEscEvent: function () {
      document.addEventListener('keydown', onAdvertEscPress);
    }
  };
})();
