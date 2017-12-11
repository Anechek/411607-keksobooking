'use strict';
window.pin = (function () {
  var MAP_PIN_WIDTH_HALF = 20;
  var MAP_PIN_HEIGHT_PLUS10 = 50;
  var ENTER_KEYCODE = 13;

  // Функция, определяющая действия при клике на mapPin

  function onMapPinClick(evt) {
    var clickedElement = evt.currentTarget;
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive === null) {
      if (clickedElement !== window.map.mapPinMain) {
        window.card.addAdvertOnMap(window.adverts[clickedElement.dataset.num]);
        window.card.articleTemp.removeAttribute('hidden', '');
        window.card.addAdvertEscEvent();
      }
    } else {
      mapPinActive.classList.remove('map__pin--active');
      if (clickedElement === window.map.mapPinMain) {
        window.card.articleTemp.setAttribute('hidden', '');
      } else {
        window.card.articleTemp.removeAttribute('hidden', '');
        window.card.addAdvertOnMap(window.adverts[clickedElement.dataset.num]);
        window.card.addAdvertEscEvent();
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

  // Делаем неактивными все поля формы

  window.form.makeActiveAllFields(false);

  return {
    MAP_PIN_WIDTH_HALF: MAP_PIN_WIDTH_HALF,
    MAP_PIN_HEIGHT_PLUS10: MAP_PIN_HEIGHT_PLUS10,

    addHandlersForAllButtons: addHandlersForAllButtons,

    removeActivePin: function () {
      var mapPinActive = document.querySelector('.map__pin--active');
      if (mapPinActive !== null) {
        mapPinActive.classList.remove('map__pin--active');
      }
    },

    // Функция для создания баттонов для каждого маппина

    addMapPins: function (advertsArray) {
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
      window.map.mapPinsBlock.appendChild(fragment);
    }
  };
})();
