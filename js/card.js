'use strict';
window.card = (function () {
  var ESC_KEYCODE = 27;
  var TITLE_TYPES_OF_HOUSES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var OPTIONS_NUMBERS_OF_ROOMS = ['комната', 'комнаты', 'комнат'];
  var OPTIONS_NUMBERS_OF_GUESTS = ['гостя', 'гостей', 'гостей'];

  // Функция для склонения числительных

  function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  // Функция для определения заголовка

  function getTitleDependOnType(type) {
    return TITLE_TYPES_OF_HOUSES[type];
  }

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

  // Функция заполнения объявления, созданного из шаблона, данными из параметра advert

  var addAdvertOnMap = function (advert) {
    articleTemp.querySelector('h3').textContent = advert.offer.title;
    var paragraphs = articleTemp.querySelectorAll('p');
    paragraphs[0].textContent = advert.offer.address;
    paragraphs[1].innerHTML = '' + advert.offer.price + '&#x20bd;/ночь';
    paragraphs[2].textContent = '' + advert.offer.rooms + ' ' + declOfNum(advert.offer.rooms, OPTIONS_NUMBERS_OF_ROOMS) + ' для ' + advert.offer.guests + ' ' + declOfNum(advert.offer.guests, OPTIONS_NUMBERS_OF_GUESTS);
    paragraphs[3].textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;
    paragraphs[4].textContent = advert.offer.description;
    articleTemp.querySelector('h4').textContent = getTitleDependOnType(advert.offer.type);
    articleTemp.querySelector('.popup__avatar').setAttribute('src', advert.autor.avatar);
    var featuresElement = articleTemp.querySelector('.popup__features');
    // надо очистить все элементы li которые содержались изначально в шаблоне
    featuresElement.innerHTML = '';
    var fragment = document.createDocumentFragment();
    advert.offer.features.forEach(function (v, i, arr) {
      var li = document.createElement('li');
      li.className = 'feature feature--' + arr[i];
      fragment.appendChild(li);
    });
    featuresElement.appendChild(fragment);
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
    addAdvertOnMap: addAdvertOnMap,

    addAdvertEscEvent: function () {
      document.addEventListener('keydown', onAdvertEscPress);
    },

    articleTemp: articleTemp
  };
})();
