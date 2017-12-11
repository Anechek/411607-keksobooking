'use strict';
window.map = (function () {

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
  };

  var mapPinsBlock = document.querySelector('.map__pins');

  // делаем обработчик для отпускания мышки на элементе .map__pin--main

  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', onButtonMouseup);

  return {
    mapPinsBlock: mapPinsBlock,
    mapPinMain: mapPinMain
  };

})();
