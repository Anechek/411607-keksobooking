'use strict';
window.form = (function () {
  var ALL_TYPES_OF_HOUSES = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICES = ['0', '1000', '5000', '10000'];
  var MAX_COUNT_GUESTS = 100;
  var TIMES_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];

  // Функция для обработчика ввода времени заезда и выезда

  var syncValues = function (element, value) {
    element.value = value;
  };

  // Функция для обработчика ввода типа жилья

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  var setMinPrice = function (minPrice) {
    priceChangeElement.min = minPrice;
  };

  // Функция поиска атрибута selected

  var getSelectedCapacity = function () {
    for (var i = 0; i < capacityArray.length; i++) {
      if (capacityArray[i].hasAttribute('selected')) {
        return i;
      }
    }
    return false;
  };

  // Функция установки атрибута selected

  var setSelectedCapacity = function (guests) {
    for (var i = 0; i < capacityArray.length; i++) {
      if (Number(capacityArray[i].value) === guests) {
        capacityArray[i].setAttribute('selected', '');
      }
    }
  };

  // Функция установки валидного количества гостей в зависимости количества комнат

  var setValidGuests = function (rooms) {
    if (capacityArray[getSelectedCapacity()].value !== rooms) {
      capacityArray[getSelectedCapacity()].removeAttribute('selected', '');
      if (rooms === MAX_COUNT_GUESTS) {
        setSelectedCapacity(0);
      } else {
        setSelectedCapacity(1);
      }
    }
  };

  // этой функцией дисаблим все option для capacity

  var disableAllCapacities = function () {
    for (var i = 0; i < capacityArray.length; i++) {
      capacityArray[i].setAttribute('hidden', '');
    }
  };

  // эта функция открывает первые num options в capacity

  var openCapacities = function (num) {
    for (var i = 1; i <= num; i++) {
      for (var j = 0; j < capacityArray.length; j++) {
        if (Number(capacityArray[j].value) === i) {
          capacityArray[j].removeAttribute('hidden', '');
        }
      }
    }
  };

  // Функция для обработчика ввода количества комнат

  var onRoomsChange = function (evt) {
    var roomValue = +evt.target.value;
    disableAllCapacities();
    if (roomValue === MAX_COUNT_GUESTS) {
      setValidGuests(MAX_COUNT_GUESTS);
      for (var i = 0; i < capacityArray.length; i++) {
        if (Number(capacityArray[i].value) === 0) {
          capacityArray[i].removeAttribute('hidden', '');
        }
      }
    } else {
      setValidGuests(1);
      for (var j = 1; j <= roomValue; j++) {
        openCapacities(j);
      }
    }
  };

  // При успешной отправке

  var onSuccessSubmit = function () {
    noticeFormElement.reset();
  };

  // Функция для обработчика нажатия кнопки Опубликовать

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(noticeFormElement), onSuccessSubmit, window.data.onErrorLoadSave);
    evt.preventDefault();
  };

  var noticeFormElement = document.querySelector('.notice__form');
  noticeFormElement.addEventListener('submit', onFormSubmit);

  // Обработчик ввода времени заезда

  var timeInChangeElement = noticeFormElement.querySelector('#timein');
  var timeOutChangeElement = noticeFormElement.querySelector('#timeout');

  timeInChangeElement.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, timeOutChangeElement, TIMES_CHECK_IN_OUT, TIMES_CHECK_IN_OUT, syncValues);
  });

  timeOutChangeElement.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, timeInChangeElement, TIMES_CHECK_IN_OUT, TIMES_CHECK_IN_OUT, syncValues);
  });

  // Обработчик ввода типа жилья

  var typeChangeElement = noticeFormElement.querySelector('#type');
  var priceChangeElement = noticeFormElement.querySelector('#price');

  typeChangeElement.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, priceChangeElement, ALL_TYPES_OF_HOUSES, MIN_PRICES, syncValueWithMin);
  });

  // Обработчик ввода количества комнат

  var roomsChangeElement = noticeFormElement.querySelector('#room_number');
  var capacityChangeElement = noticeFormElement.querySelector('#capacity');
  var capacityArray = capacityChangeElement.querySelectorAll('option');
  roomsChangeElement.addEventListener('change', onRoomsChange);
  setMinPrice(MIN_PRICES[1]);
  setValidGuests(1);

  var fieldsetArray = noticeFormElement.querySelectorAll('fieldset');

  return {
    noticeFormElement: noticeFormElement,

    // Функция активации/деактивации полей формы

    makeActiveAllFields: function (isActive) {
      for (var i = 0; i < fieldsetArray.length; i++) {
        if (isActive) {
          fieldsetArray[i].removeAttribute('disabled', '');
        } else {
          fieldsetArray[i].setAttribute('disabled', '');
        }
      }
    }
  };
})();
