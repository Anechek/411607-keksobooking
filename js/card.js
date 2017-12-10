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
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive !== null) {
      mapPinActive.classList.remove('map__pin--active');
    }
    articleTemp.setAttribute('hidden', '');
    document.removeEventListener('keydown', window.card.onAdvertEscPress);
  };
  
  var advertsTemplate = document.querySelector('template').content;
  var newElement = advertsTemplate.cloneNode(true);
  var map = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');
  map.insertBefore(newElement, beforeElement);
  var advertElement = document.querySelector('article');
  // Убираем с экрана объявление, которое появляется в начале
  var articleTemp = document.querySelector('article');
  // window.articleTemp = document.querySelector('article');
  // var articleTemp = document.querySelector('article');
  articleTemp.setAttribute('hidden', '');
  // Под объявлением оказался еще один баттон. Скрываем его тоже.
  var buttonTemp = document.querySelectorAll('button.map__pin');
  buttonTemp[buttonTemp.length - 1].setAttribute('hidden', '');
  // Обаботчик события при клике popupClose
  var popupClose = articleTemp.querySelector('.popup__close');
  popupClose.addEventListener('click', onPopupCloseClick);
  
  return {
    
  // Функция заполнения объявления, созданного из шаблона, данными из параметра advert
    
    addAdvertOnMap: function (advert) {
      advertElement.querySelector('h3').textContent = advert.offer.title;
      var paragraphs = advertElement.querySelectorAll('p');
      paragraphs[0].textContent = advert.offer.address;
      paragraphs[1].innerHTML = '' + advert.offer.price + '&#x20bd;/ночь';
      paragraphs[2].textContent = '' + advert.offer.rooms + ' ' + declOfNum(advert.offer.rooms, OPTIONS_NUMBERS_OF_ROOMS) + ' для ' + advert.offer.guests + ' ' + declOfNum(advert.offer.guests, OPTIONS_NUMBERS_OF_GUESTS);
      paragraphs[3].textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;
      paragraphs[4].textContent = advert.offer.description;
      advertElement.querySelector('h4').textContent = getTitleDependOnType(advert.offer.type);
      advertElement.querySelector('.popup__avatar').setAttribute('src', advert.autor.avatar);
      var featuresElement = advertElement.querySelector('.popup__features');
      // надо очистить все элементы li которые содержались изначально в шаблоне
      featuresElement.innerHTML = '';
      var fragment = document.createDocumentFragment();
      advert.offer.features.forEach(function (v, i, arr) {
        var li = document.createElement('li');
        li.className = 'feature feature--' + arr[i];
        fragment.appendChild(li);
      });
      featuresElement.appendChild(fragment);
    },
    
    // Функция для обработчика события при нажатии Esc
    
    onAdvertEscPress: function (evt) {
    // var onAdvertEscPress = function (evt) {
      var mapPinActive = document.querySelector('.map__pin--active');
      if (evt.keyCode === ESC_KEYCODE && mapPinActive !== null) {
        articleTemp.setAttribute('hidden', '');
        mapPinActive.classList.remove('map__pin--active');
      }
    },
    articleTemp: articleTemp
  };
})();
