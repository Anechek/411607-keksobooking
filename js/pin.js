'use strict';
(function () {
  var MAP_PIN_WIDTH_HALF = 20;
  var MAP_PIN_HEIGHT_PLUS10 = 50;
  var ENTER_KEYCODE = 13;
  // Функция для создания баттонов для каждого маппина
  function addMapPins(advertsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsArray.length; i++) {
      var button = document.createElement('button');
      button.style.left = '' + (advertsArray[i].location.x - MAP_PIN_WIDTH_HALF) + 'px';
      button.style.top = '' + (advertsArray[i].location.y - MAP_PIN_HEIGHT_PLUS10) + 'px';
      button.className = 'map__pin';
      button.innerHTML = '<img src="' + advertsArray[i].autor.avatar + '" width="40" height="40" draggable="false">';
      button.dataset.num = i;
      fragment.appendChild(button);
    }
    mapPinsBlock.appendChild(fragment);
  }
  // Функция активации/деактивации полей формы
  function makeActiveAllFields(isActive) {
    for (var i = 0; i < fieldsetForm.length; i++) {
      if (isActive) {
        fieldsetForm[i].removeAttribute('disabled', '');
      } else {
        fieldsetForm[i].setAttribute('disabled', '');
      }
    }
  }
  // Функция, определяющая действия при клике на mapPin
  function onMapPinClick(evt) {
    var clickedElement = evt.currentTarget;
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive === null) {
      if (clickedElement !== mapPinMain) {
        window.card.addAdvertOnMap(window.adverts[clickedElement.dataset.num]);
        window.card.articleTemp.removeAttribute('hidden', '');
        document.addEventListener('keydown', window.card.onAdvertEscPress);
      }
    } else {
      mapPinActive.classList.remove('map__pin--active');
      if (clickedElement === mapPinMain) {
        window.card.articleTemp.setAttribute('hidden', '');
      } else {
        window.card.articleTemp.removeAttribute('hidden', '');
        window.card.addAdvertOnMap(window.adverts[clickedElement.dataset.num]);
        document.addEventListener('keydown', window.card.onAdvertEscPress);
      }
    }
    clickedElement.classList.add('map__pin--active');
  }
  // Обрабочик для кнопок
  function addHandlersForAllButtons() {
    var mapPins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', function (evt) {
        onMapPinClick(evt);
      });
      mapPins[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          onMapPinClick(evt);
        }
      });
    }
  }
  // Событие moseup
  var onButtonMouseup = function (evt) {
    var clickedElement = evt.currentTarget;
    clickedElement.classList.add('map__pin--active');
    window.noticeForm.classList.remove('notice__form--disabled');
    window.card.articleTemp.setAttribute('hidden', '');
    addMapPins(window.adverts);
    addHandlersForAllButtons();
    makeActiveAllFields(true);
    mapPinMain.removeEventListener('mouseup', onButtonMouseup);
  };
  var mapPinsBlock = document.querySelector('.map__pins');
  // Делаем неактивными все поля формы
  var fieldsetForm = window.noticeForm.querySelectorAll('fieldset');
  makeActiveAllFields(false);
  // делаем обработчик для отпускания мышки на элементе .map__pin--main
  var mapPinMain = document.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mouseup', onButtonMouseup);
})();
