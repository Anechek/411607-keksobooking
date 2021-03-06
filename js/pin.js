'use strict';
(function () {
  var MAP_PIN_WIDTH_HALF = 20;
  var MAP_PIN_HEIGHT_PLUS10 = 50;
  var ENTER_KEYCODE = 13;

  // Функция, определяющая действия при клике на mapPin

  var onMapPinClick = function (evt) {
    var clickedElement = evt.currentTarget;
    var mapPinActiveElement = document.querySelector('.map__pin--active');
    if (mapPinActiveElement === null) {
      if (clickedElement !== window.map.pinMainElement) {
        window.showCard(window.data.adverts[clickedElement.dataset.number], window.card.articleElement, true);
        window.card.addAdvertEscEvent();
      }
    } else {
      mapPinActiveElement.classList.remove('map__pin--active');
      if (clickedElement === window.map.pinMainElement) {
        window.showCard(null, window.card.articleElement, false);
      } else {
        window.showCard(window.data.adverts[clickedElement.dataset.number], window.card.articleElement, true);
        window.card.addAdvertEscEvent();
      }
    }
    clickedElement.classList.add('map__pin--active');
  };

  // Обрабочик для кнопок

  var addHandlersForAllButtons = function (buttons) {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', onMapPinClick);
      buttons[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          onMapPinClick(evt);
        }
      });
    }
  };

  // Функция получает массив нажатых инпутов в фиелдсете

  var getCheckedInput = function (inputs) {
    var array = [];
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        array.push(inputs[i].value);
      }
    }
    return array;
  };

  // Функция для обработчика при любом изменении фильтра

  var onFilterChange = function () {
    window.debounce(function () {

      // Подготавливаем переменные для фильтра

      var form = document.forms[0];
      var houseType = form.elements['housing-type'].value;
      var priceType = form.elements['housing-price'].value;
      var rooms = form.elements['housing-rooms'].value;
      var guests = form.elements['housing-guests'].value;
      var features = getCheckedInput(form.elements.features);

      // Показываем только те пины, которые соответствуют фильтру 

      window.map.showPins(window.map.MAXIMUM_VISIBLE_PINS, houseType, priceType, rooms, guests, features);

      // Если отфильтровался активный пин, то надо скрыть карточку

      var activePinElement = document.querySelector('.map__pin--active');

      if (activePinElement !== null && activePinElement.hasAttribute('hidden')) {
        window.showCard(null, window.card.articleElement, false);
        activePinElement.classList.remove('map__pin--active');
      }
    });
  };

  // Функция для создания баттонов для каждого маппина

  var addMapPins = function (advertsArray) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertsArray.length; i++) {
      var button = window.card.buttonElement.cloneNode(true);
      button.style.left = '' + (advertsArray[i].location.x - MAP_PIN_WIDTH_HALF) + 'px';
      button.style.top = '' + (advertsArray[i].location.y - MAP_PIN_HEIGHT_PLUS10) + 'px';
      button.dataset.number = i;
      var imageElement = button.querySelector('img');
      imageElement.src = advertsArray[i].author.avatar;
      fragment.appendChild(button);
    }
    var mapPinsBlockElement = document.querySelector('.map__pins');
    mapPinsBlockElement.appendChild(fragment);
  };

  var removeActive = function () {
    var mapPinActiveElement = document.querySelector('.map__pin--active');
    if (mapPinActiveElement !== null) {
      mapPinActiveElement.classList.remove('map__pin--active');
    }
  };

  // Делаем неактивными все поля формы

  window.form.makeActiveAllFields(false);

  // Объявляем обработчик на измнение любого поля в фильтрах

  window.card.filtersElement.addEventListener('change', onFilterChange);

  window.pin = {
    MAP_PIN_WIDTH_HALF: MAP_PIN_WIDTH_HALF,
    MAP_PIN_HEIGHT_PLUS10: MAP_PIN_HEIGHT_PLUS10,

    addHandlersForAllButtons: addHandlersForAllButtons,
    addMapPins: addMapPins,
    removeActive: removeActive
  };
})();
