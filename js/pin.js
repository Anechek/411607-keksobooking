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
        window.showCard(window.data.adverts[clickedElement.dataset.num], window.card.articleTemp, true);
        window.card.addAdvertEscEvent();
      }
    } else {
      mapPinActive.classList.remove('map__pin--active');
      if (clickedElement === window.map.mapPinMain) {
        window.showCard(null, window.card.articleTemp, false);
      } else {
        window.showCard(window.data.adverts[clickedElement.dataset.num], window.card.articleTemp, true);
        window.card.addAdvertEscEvent();
      }
    }
    clickedElement.classList.add('map__pin--active');
  }

  // Обрабочик для кнопок

  function addHandlersForAllButtons(buttons) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (evt) {
        onMapPinClick(evt);
      });
      buttons[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          onMapPinClick(evt);
        }
      });
    }
  }

  // Функция получает массив нажатых инпутов в фиелдсете

  var getCheckedInput = function (inputs) {
    var arr = [];
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        arr.push(inputs[i].value);
      }
    }
    return arr;
  };

  // Функция для обработчика при любом изменении фильтра

  function onFilterChange() {
    window.debounce(function () {

      // Подготавливаем переменные для фильтра

      var form = document.forms[0];
      var houseType = form.elements['housing-type'].value;
      var priceType = form.elements['housing-price'].value;
      var rooms = form.elements['housing-rooms'].value;
      var guests = form.elements['housing-guests'].value;
      var features = getCheckedInput(form.elements['housing-features'].elements);

      // Показываем только те пины, которые соответствуют фильтру 

      window.map.showPins(window.map.MAX_VISIBLE_PINS, houseType, priceType, rooms, guests, features);

      // Если отфильтровался активный пин, то надо скрыть карточку

      var activePin = document.querySelector('.map__pin--active');

      if (activePin !== null && activePin.hasAttribute('hidden')) {
        window.showCard(null, window.card.articleTemp, false);
        activePin.classList.remove('map__pin--active');
      }
    });
  }

  // Функция для создания баттонов для каждого маппина

  var addMapPins = function (advertsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsArray.length; i++) {
      var button = document.createElement('button');
      button.style.left = '' + (advertsArray[i].location.x - MAP_PIN_WIDTH_HALF) + 'px';
      button.style.top = '' + (advertsArray[i].location.y - MAP_PIN_HEIGHT_PLUS10) + 'px';
      button.className = 'map__pin';
      button.innerHTML = '<img src="' + advertsArray[i].author.avatar + '" width="40" height="40" draggable="false">';
      button.dataset.num = i;
      fragment.appendChild(button);
    }
    var mapPinsBlock = document.querySelector('.map__pins');
    mapPinsBlock.appendChild(fragment);
  };

  var removeActivePin = function () {
    var mapPinActive = document.querySelector('.map__pin--active');
    if (mapPinActive !== null) {
      mapPinActive.classList.remove('map__pin--active');
    }
  };

  // Делаем неактивными все поля формы

  window.form.makeActiveAllFields(false);

  // Объявляем обработчик на измнение любого поля в фильтрах

  window.card.filtersElement.addEventListener('change', onFilterChange);

  return {
    MAP_PIN_WIDTH_HALF: MAP_PIN_WIDTH_HALF,
    MAP_PIN_HEIGHT_PLUS10: MAP_PIN_HEIGHT_PLUS10,

    addHandlersForAllButtons: addHandlersForAllButtons,
    addMapPins: addMapPins,
    removeActivePin: removeActivePin
  };
})();
