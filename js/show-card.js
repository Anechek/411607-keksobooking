'use strict';
(function () {

  var OPTIONS_NUMBERS_OF_ROOMS = ['комната', 'комнаты', 'комнат'];
  var OPTIONS_NUMBERS_OF_GUESTS = ['гостя', 'гостей', 'гостей'];
  var TITLE_TYPES_OF_HOUSES = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var HUNDRED = 100;
  var TWENTY = 20;
  var TEN = 10;
  var FIVE = 5;
  var FOUR = 4;
  var TWO = 2;

  window.showCard = function (advert, element, show) {

    // Функция для склонения числительных

    var declineNumber = function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % HUNDRED > FOUR && number % HUNDRED < TWENTY) ? TWO : cases[(number % TEN < FIVE) ? number % TEN : FIVE]];
    };

    // Функция для определения заголовка

    var getTitleDependOnType = function (type) {
      return TITLE_TYPES_OF_HOUSES[type];
    };
    if (show) {
      element.querySelector('h3').textContent = advert.offer.title;
      var paragraphElements = element.querySelectorAll('p');
      paragraphElements[0].textContent = advert.offer.address;
      paragraphElements[1].textContent = '' + advert.offer.price + '&#x20bd;/ночь';
      paragraphElements[2].textContent = '' + advert.offer.rooms + ' ' + declineNumber(advert.offer.rooms, OPTIONS_NUMBERS_OF_ROOMS) + ' для ' + advert.offer.guests + ' ' + declineNumber(advert.offer.guests, OPTIONS_NUMBERS_OF_GUESTS);
      paragraphElements[3].textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;
      paragraphElements[4].textContent = advert.offer.description;
      element.querySelector('h4').textContent = getTitleDependOnType(advert.offer.type);
      element.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
      var featuresElement = element.querySelector('.popup__features');

      // надо очистить все элементы li которые содержались изначально в шаблоне

      featuresElement.innerHTML = '';
      var fragment = document.createDocumentFragment();
      advert.offer.features.forEach(function (v, i, array) {
        var liElement = document.createElement('li');
        liElement.className = 'feature feature--' + array[i];
        fragment.appendChild(liElement);
      });
      featuresElement.appendChild(fragment);
      element.children[0].removeAttribute('hidden', '');
      element.children[1].removeAttribute('hidden', '');
      element.removeAttribute('hidden', '');
    } else {
      element.children[0].setAttribute('hidden', '');
      element.children[1].setAttribute('hidden', '');
      element.setAttribute('hidden', '');
    }
  };
})();
