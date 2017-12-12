'use strict';
window.map = (function () {

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

      if (coordY > 100 && coordY < 500) {
        mapPinMain.style.top = coordY + 'px';
      }
      mapPinMain.style.left = coordX + 'px';

      // Вопрос Наставнику: надо ли сделать глобальными две константы INITIAL_ADDRESS_X и INITIAL_ADDRESS_Y из модуля 
      // data.js и использовать их здесь? Или вообще от них отказаться и сделать как здесь 'x: ' и 'y: ' ??

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
    window.card.articleTemp.setAttribute('hidden', '');
    window.pin.addMapPins(window.adverts);
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
