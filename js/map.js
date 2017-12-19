'use strict';
window.map = (function () {
  var MIN_COORD_Y = 100;
  var MAX_COORD_Y = 500;
  var MAX_VISIBLE_PINS = 5;
  var ANY = 'any';
  var MIDDLE = 'middle';
  var LOW = 'low';
  var HIGH = 'high';

  var mapPins;

  var onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordX = mapPinMain.offsetLeft - shift.x;
      var coordY = mapPinMain.offsetTop - shift.y;

      if (coordY > MIN_COORD_Y && coordY < MAX_COORD_Y) {
        mapPinMain.style.top = coordY + 'px';
      }
      mapPinMain.style.left = coordX + 'px';

      addressInput.value = 'x: ' + (coordX + window.pin.MAP_PIN_WIDTH_HALF) + ', y: ' + (coordY + window.pin.MAP_PIN_HEIGHT_PLUS10);
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

  // Функция для скрытия всех пинов

  var hideAllPins = function () {
    for (var i = 1; i < window.map.mapPins.length; i++) {
      window.map.mapPins[i].setAttribute('hidden', '');
    }
  };

  // Функция для фильтрации массива объявлений, но не более max

  var getFilteredAdverts = function (max, filter1, filter2, filter3, filter4, filters5) {
    var arr = window.data.adverts.
        map(function (advert, index) {
          advert.mainIndex = index;
          return advert;
        }).
        filter(function (advert) {
          return (filter1 === ANY) || (filter1 === advert.offer.type);
        }).
        filter(function (advert) {
          switch (filter2) {
            case ANY:
              return true;
            case MIDDLE:
              return (advert.offer.price >= 10000) && (advert.offer.price <= 50000);
            case LOW:
              return (advert.offer.price < 10000);
            case HIGH:
              return (advert.offer.price > 50000);
            default:
              return false;
          }
        }).
        filter(function (advert) {
          return (filter3 === ANY) || (parseInt(filter3, 10) === advert.offer.rooms);
        }).
        filter(function (advert) {
          return (filter4 === ANY) || (parseInt(filter4, 10) === advert.offer.guests);
        }).
        filter(function (advert) {
          if (filters5.length === 0) {
            return true;
          } else {
            var heap = ' ' + advert.offer.features.join(', ');
            for (var i = 0; i < filters5.length; i++) {
              if (heap.lastIndexOf(' ' + filters5[i]) < 0) {
                return false;
              }
            }
            return true;
          }
        }).
        slice(0, max);
    return arr;
  };

  // Функция для отображения пинов

  var showPins = function (count, houseFilter, priceFilter, roomsFilter, guestsFiter, features) {

    hideAllPins();
    var filteredAdverts = getFilteredAdverts(count, houseFilter, priceFilter, roomsFilter, guestsFiter, features);

    // Осталось только отобразить все отфильтрованные Пины

    filteredAdverts.forEach(function (element) {
      for (var i = 1; i < window.map.mapPins.length; i++) {
        if (parseInt(window.map.mapPins[i].dataset.num, 10) === element.mainIndex) {
          window.map.mapPins[i].removeAttribute('hidden', '');
        }
      }
    });
  };

  // Событие moseup

  var onButtonMouseup = function (evt) {
    var clickedElement = evt.currentTarget;
    clickedElement.classList.add('map__pin--active');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    window.showCard(null, window.card.articleTemp, false);
    window.pin.addMapPins(window.data.adverts);
    window.map.mapPins = document.querySelectorAll('.map__pin');
    window.pin.addHandlersForAllButtons();
    window.form.makeActiveAllFields(true);
    document.querySelector('.map').classList.remove('map--faded');
    showPins(MAX_VISIBLE_PINS, ANY, ANY, ANY, ANY, []);
    mapPinMain.removeEventListener('mouseup', onButtonMouseup);
  };

  var mapPinsBlock = document.querySelector('.map__pins');

  // Делаем обработчик для отпускания мышки на элементе .map__pin--main

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = window.form.noticeForm.querySelector('#address');

  mapPinMain.addEventListener('mouseup', onButtonMouseup);
  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

  return {
    MAX_VISIBLE_PINS: MAX_VISIBLE_PINS,
    mapPinsBlock: mapPinsBlock,
    mapPinMain: mapPinMain,
    mapPins: mapPins,
    showPins: showPins
  };
})();
