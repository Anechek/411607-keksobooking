'use strict';
(function () {

  window.showCard = function (advert, element, show) {

    var OPTIONS_NUMBERS_OF_ROOMS = ['комната', 'комнаты', 'комнат'];
    var OPTIONS_NUMBERS_OF_GUESTS = ['гостя', 'гостей', 'гостей'];
    var TITLE_TYPES_OF_HOUSES = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

    // Функция для склонения числительных

    var declineNumber = function (number, titles) {
      var cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    };

    // Функция для определения заголовка

    var getTitleDependOnType = function (type) {
      return TITLE_TYPES_OF_HOUSES[type];
    };

    if (show) {
      element.querySelector('h3').textContent = advert.offer.title;
      var paragraphs = element.querySelectorAll('p');
      paragraphs[0].textContent = advert.offer.address;
      paragraphs[1].innerHTML = '' + advert.offer.price + '&#x20bd;/ночь';
      paragraphs[2].textContent = '' + advert.offer.rooms + ' ' + declineNumber(advert.offer.rooms, OPTIONS_NUMBERS_OF_ROOMS) + ' для ' + advert.offer.guests + ' ' + declineNumber(advert.offer.guests, OPTIONS_NUMBERS_OF_GUESTS);
      paragraphs[3].textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;
      paragraphs[4].textContent = advert.offer.description;
      element.querySelector('h4').textContent = getTitleDependOnType(advert.offer.type);
      element.querySelector('.popup__avatar').setAttribute('src', advert.author.avatar);
      var featuresElement = element.querySelector('.popup__features');
      // надо очистить все элементы li которые содержались изначально в шаблоне
      featuresElement.innerHTML = '';
      var fragment = document.createDocumentFragment();
      advert.offer.features.forEach(function (v, i, arr) {
        var li = document.createElement('li');
        li.className = 'feature feature--' + arr[i];
        fragment.appendChild(li);
      });
      featuresElement.appendChild(fragment);
      element.removeAttribute('hidden', '');
    } else {
      element.setAttribute('hidden', '');
    }
  };
})();
