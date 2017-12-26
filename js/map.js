'use strict';
(function () {
  var MINIMUM_COORDINATE_Y = 100;
  var MAXIMUM_COORDINATE_Y = 500;
  var MAXIMUM_VISIBLE_PINS = 5;
  var ANY = 'any';
  var MIDDLE = 'middle';
  var LOW = 'low';
  var HIGH = 'high';
  var PRICE_LOW_LIMIT = '10000';
  var PRICE_HIGH_LIMIT = '50000';

  var mapPinElements;

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinateX = pinMainElement.offsetLeft - shift.x;
      var coordinateY = pinMainElement.offsetTop - shift.y;

      if (coordinateY > MINIMUM_COORDINATE_Y && coordinateY < MAXIMUM_COORDINATE_Y) {
        pinMainElement.style.top = coordinateY + 'px';
      }
      pinMainElement.style.left = coordinateX + 'px';

      addressInputElement.value = 'x: ' + (coordinateX + window.pin.MAP_PIN_WIDTH_HALF) + ', y: ' + (coordinateY + window.pin.MAP_PIN_HEIGHT_PLUS10);
    };

    // Функция обработки события при отпускании кнопки мыши

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var setInitialAddress = function () {
    pinMainElement.style.top = initialCoordinates.y;
    pinMainElement.style.left = initialCoordinates.x;
    addressInputElement.value = 'x: ' + (initialAddress.x + window.pin.MAP_PIN_WIDTH_HALF) + ', y: ' + (initialAddress.y + window.pin.MAP_PIN_HEIGHT_PLUS10);
  };

  // Функция для скрытия всех пинов

  var hideAllPins = function (pins) {
    for (var i = 1; i < pins.length; i++) {
      pins[i].setAttribute('hidden', '');
    }
  };

  var filterByType = function (element, filter) {
    return (filter === ANY) || (filter === element.offer.type);
  };

  var filterByPrice = function (element, filter) {
    switch (filter) {
      case ANY:
        return true;
      case MIDDLE:
        return (element.offer.price >= PRICE_LOW_LIMIT) && (element.offer.price <= PRICE_HIGH_LIMIT);
      case LOW:
        return (element.offer.price < PRICE_LOW_LIMIT);
      case HIGH:
        return (element.offer.price > PRICE_HIGH_LIMIT);
      default:
        return false;
    }
  };

  var filterByRooms = function (element, filter) {
    return (filter === ANY) || (parseInt(filter, 10) === element.offer.rooms);
  };

  var filterByGuests = function (element, filter) {
    return (filter === ANY) || (parseInt(filter, 10) === element.offer.guests);
  };

  var filterByFeatures = function (element, filters) {
    if (filters.length === 0) {
      return true;
    } else {
      var heap = ' ' + element.offer.features.join(', ');
      for (var i = 0; i < filters.length; i++) {
        if (heap.lastIndexOf(' ' + filters[i]) < 0) {
          return false;
        }
      }
      return true;
    }
  };

  // Функция для отображения пинов

  var showPins = function (count, houseFilter, priceFilter, roomsFilter, guestsFiter, features) {
    hideAllPins(mapPinElements);
    var filteredAdverts = window.data.adverts.map(function (advert, index) {
      advert.mainIndex = index;
      return advert;
    }).
        filter(function (advert) {
          return filterByType(advert, houseFilter) && filterByPrice(advert, priceFilter) && filterByRooms(advert, roomsFilter) && filterByGuests(advert, guestsFiter) && filterByFeatures(advert, features);
        }).
        slice(0, count);

    // Осталось только отобразить все отфильтрованные Пины

    filteredAdverts.forEach(function (element) {
      for (var i = 1; i < mapPinElements.length; i++) {
        if (parseInt(mapPinElements[i].dataset.number, 10) === element.mainIndex) {
          mapPinElements[i].removeAttribute('hidden', '');
        }
      }
    });
  };

  // Событие moseup

  var onButtonMouseup = function (evt) {
    var clickedElement = evt.currentTarget;
    clickedElement.classList.add('map__pin--active');
    window.form.noticeElement.classList.remove('notice__form--disabled');
    window.showCard(null, window.card.articleElement, false);
    window.pin.addMapPins(window.data.adverts);
    mapPinElements = document.querySelectorAll('.map__pin');
    window.pin.addHandlersForAllButtons(mapPinElements);
    window.form.makeActiveAllFields(true);
    document.querySelector('.map').classList.remove('map--faded');
    showPins(MAXIMUM_VISIBLE_PINS, ANY, ANY, ANY, ANY, []);
    pinMainElement.removeEventListener('mouseup', onButtonMouseup);
  };

  // Делаем обработчик для отпускания мышки на элементе .map__pin--main

  var pinMainElement = document.querySelector('.map__pin--main');

  pinMainElement.addEventListener('mouseup', onButtonMouseup);
  pinMainElement.addEventListener('mousedown', onMainPinMouseDown);

  // Запоминаем первоначальное положение пина и соответсвующий ему адрес

  var initialCoordinates = {
    x: pinMainElement.style.left,
    y: pinMainElement.style.top
  };
  var initialAddress = {
    x: pinMainElement.offsetLeft,
    y: pinMainElement.offsetTop
  };

  var addressInputElement = window.form.noticeElement.querySelector('#address');

  window.map = {
    MAXIMUM_VISIBLE_PINS: MAXIMUM_VISIBLE_PINS,

    pinMainElement: pinMainElement,

    setInitialAddress: setInitialAddress,
    showPins: showPins
  };
})();
