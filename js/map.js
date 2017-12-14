'use strict';
window.map = (function () {
  var MIN_COORD_Y = 100;
  var MAX_COORD_Y = 500;

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

  // Событие moseup

  var onButtonMouseup = function (evt) {
    var clickedElement = evt.currentTarget;
    clickedElement.classList.add('map__pin--active');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    window.showCard(null, window.card.articleTemp, false);
    window.pin.addMapPins(window.data.adverts);
    window.pin.addHandlersForAllButtons();
    window.form.makeActiveAllFields(true);
    mapPinMain.removeEventListener('mouseup', onButtonMouseup);
    document.querySelector('.map').classList.remove('map--faded');
  };

  var mapPinsBlock = document.querySelector('.map__pins');

  // делаем обработчик для отпускания мышки на элементе .map__pin--main

  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = window.form.noticeForm.querySelector('#address');

  mapPinMain.addEventListener('mouseup', onButtonMouseup);
  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

  return {
    mapPinsBlock: mapPinsBlock,
    mapPinMain: mapPinMain
  };
})();
