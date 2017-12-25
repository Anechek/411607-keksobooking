'use strict';
(function () {
  var ALL_TYPES_OF_HOUSES = ['bungalo', 'flat', 'house', 'palace'];
  var MINIMUM_PRICES = ['0', '1000', '5000', '10000'];
  var MAXIMUM_COUNT_ROOMS = 100;
  var TIMES_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var MININIMUM_LENGTH = 30;
  var MAXIMUM_LENGTH = 100;

  // Функция для обработчика ввода времени заезда и выезда

  var syncValues = function (element, value) {
    element.value = value;
  };

  // Функция для обработчика ввода типа жилья

  var syncValueWithMinimum = function (element, value) {
    element.min = value;
  };

  var setMinimumPrice = function (minimumPrice) {
    priceChangeElement.min = minimumPrice;
  };

  // Функция поиска атрибута selected

  var getSelectedCapacity = function () {
    return capacityChangeElement.options.selectedIndex;
  };

  // Функция установки атрибута selected

  var setSelectedCapacity = function (guests) {
    for (var i = 0; i < capacityChangeElement.options.length; i++) {
      if (Number(capacityChangeElement.options[i].value) === guests) {
        capacityChangeElement.options[i].selected = true;
      }
    }
  };

  // Функция установки валидного количества гостей в зависимости количества комнат

  var setValidGuests = function (rooms) {
    if (capacityChangeElement.options[getSelectedCapacity()].value !== rooms) {
      capacityChangeElement.options[getSelectedCapacity()].selected = false;
      if (rooms === MAXIMUM_COUNT_ROOMS) {
        setSelectedCapacity(0);
      } else {
        setSelectedCapacity(1);
      }
    }
  };

  // этой функцией дисаблим все option для capacity

  var disableAllCapacities = function () {
    for (var i = 0; i < capacityChangeElement.options.length; i++) {
      capacityChangeElement.options[i].setAttribute('hidden', '');
    }
  };

  // эта функция открывает первые num options в capacity

  var openCapacities = function (number) {
    if (number === MAXIMUM_COUNT_ROOMS) {
      capacityChangeElement.options[capacityChangeElement.options.length - 1].removeAttribute('hidden', '');
    } else {
      for (var i = 1; i <= number; i++) {
        for (var j = 0; j < capacityChangeElement.options.length; j++) {
          if (Number(capacityChangeElement.options[j].value) === i) {
            capacityChangeElement.options[j].removeAttribute('hidden', '');
          }
        }
      }
    }
  };

  // Функция для обработчика ввода количества комнат

  var onRoomsChange = function (evt) {
    var roomValue = +evt.target.value;
    disableAllCapacities();
    if (roomValue === MAXIMUM_COUNT_ROOMS) {
      setValidGuests(MAXIMUM_COUNT_ROOMS);
    } else {
      setValidGuests(1);
    }
    openCapacities(roomValue);
  };

  var removeBoxShadow = function () {
    priceChangeElement.style.boxShadow = 'none';
    titleChangeElement.style.boxShadow = 'none';
  };

  // При успешной отправке

  var onSuccessSubmit = function () {
    noticeElement.reset();
    window.map.setInitialAddress();
    setMinimumPrice(MINIMUM_PRICES[1]);
    disableAllCapacities();
    setValidGuests(1);
    openCapacities(1);
    removeBoxShadow();
  };

  // Функция для обработчика нажатия кнопки Опубликовать

  var onFormSubmit = function (evt) {
    window.server.save(new FormData(noticeElement), onSuccessSubmit, window.data.onErrorLoadSave);
    evt.preventDefault();
  };

  var noticeElement = document.querySelector('.notice__form');
  noticeElement.addEventListener('submit', onFormSubmit);

  // Обработчик ввода времени заезда

  var timeInChangeElement = noticeElement.querySelector('#timein');
  var timeOutChangeElement = noticeElement.querySelector('#timeout');

  timeInChangeElement.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, timeOutChangeElement, TIMES_CHECK_IN_OUT, TIMES_CHECK_IN_OUT, syncValues);
  });

  timeOutChangeElement.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, timeInChangeElement, TIMES_CHECK_IN_OUT, TIMES_CHECK_IN_OUT, syncValues);
  });

  // Обработчик ввода типа жилья

  var typeChangeElement = noticeElement.querySelector('#type');
  var priceChangeElement = noticeElement.querySelector('#price');
  var titleChangeElement = noticeElement.querySelector('#title');

  titleChangeElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MININIMUM_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    } else if (target.value.length > MAXIMUM_LENGTH) {
      target.setCustomValidity('Имя должно состоять максимум из 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  typeChangeElement.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, priceChangeElement, ALL_TYPES_OF_HOUSES, MINIMUM_PRICES, syncValueWithMinimum);
  });

  var roomsChangeElement = noticeElement.querySelector('#room_number');
  var capacityChangeElement = noticeElement.querySelector('#capacity');

  // Обработчик ввода количества комнат

  roomsChangeElement.addEventListener('change', onRoomsChange);
  setMinimumPrice(MINIMUM_PRICES[1]);
  disableAllCapacities();
  setValidGuests(1);
  openCapacities(1);

  window.form = {
    noticeElement: noticeElement,

    // Функция активации/деактивации полей формы

    makeActiveAllFields: function (isActive) {
      for (var i = 0; i < noticeElement.elements.length; i++) {
        if (isActive) {
          noticeElement.elements[i].removeAttribute('disabled', '');
        } else {
          noticeElement.elements[i].setAttribute('disabled', '');
        }
      }
    }
  };
})();
