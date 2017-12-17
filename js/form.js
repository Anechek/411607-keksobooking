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

  function setMinPrice(minPrice) {
    priceChange.min = minPrice;
  }

  // Функция поиска атрибута selected

  function getSelectedCapacity() {
    for (var i = 0; i < capacityArray.length; i++) {
      if (capacityArray[i].hasAttribute('selected')) {
        return i;
      }
    }
    return false;
  }

  // Функция установки атрибута selected

  function setSelectedCapacity(guests) {
    for (var i = 0; i < capacityArray.length; i++) {
      if (Number(capacityArray[i].value) === guests) {
        capacityArray[i].setAttribute('selected', '');
      }
    }
  }

  // Функция установки валидного количества гостей в зависимости количества комнат

  function setValidGuests(rooms) {
    if (capacityArray[getSelectedCapacity()].value !== rooms) {
      capacityArray[getSelectedCapacity()].removeAttribute('selected', '');
      if (rooms === MAX_COUNT_GUESTS) {
        setSelectedCapacity(0);
      } else {
        setSelectedCapacity(1);
      }
    }
  }

  // этой функцией дисаблим все option для capacity

  function disableAllCapacity() {
    for (var i = 0; i < capacityArray.length; i++) {
      capacityArray[i].setAttribute('hidden', '');
    }
  }

  // эта функция открывает первые num options в capacity

  function unDisableCapacities(num) {
    for (var i = 1; i <= num; i++) {
      for (var j = 0; j < capacityArray.length; j++) {
        if (Number(capacityArray[j].value) === i) {
          capacityArray[j].removeAttribute('hidden', '');
        }
      }
    }
  }

  // Функция для обработчика ввода количества комнат

  var onRoomsChange = function (evt) {
    var roomValue = +evt.target.value;
    disableAllCapacity();
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
        unDisableCapacities(j);
      }
    }
  };

  // При успешной отправке

  var onSuccessSubmit = function () {
    noticeForm.reset();
  };

  // Функция для обработчика нажатия кнопки Опубликовать

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(noticeForm), onSuccessSubmit, window.data.onErrorLoadSave);
    evt.preventDefault();
  };

  var noticeForm = document.querySelector('.notice__form');
  noticeForm.addEventListener('submit', onFormSubmit);

  // Обработчик ввода времени заезда

  var timeInChange = noticeForm.querySelector('#timein');
  var timeOutChange = noticeForm.querySelector('#timeout');

  timeInChange.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, timeOutChange, TIMES_CHECK_IN_OUT, TIMES_CHECK_IN_OUT, syncValues);
  });

  timeOutChange.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, timeInChange, TIMES_CHECK_IN_OUT, TIMES_CHECK_IN_OUT, syncValues);
  });

  // Обработчик ввода типа жилья

  var typeChange = noticeForm.querySelector('#type');
  var priceChange = noticeForm.querySelector('#price');

  typeChange.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, priceChange, ALL_TYPES_OF_HOUSES, MIN_PRICES, syncValueWithMin);
  });

  // Обработчик ввода количества комнат

  var roomsChange = noticeForm.querySelector('#room_number');
  var capacityChange = noticeForm.querySelector('#capacity');
  var capacityArray = capacityChange.querySelectorAll('option');
  roomsChange.addEventListener('change', onRoomsChange);
  setMinPrice(MIN_PRICES[1]);
  setValidGuests(1);

  var fieldsetForm = noticeForm.querySelectorAll('fieldset');

  return {
    noticeForm: noticeForm,

    // Функция активации/деактивации полей формы

    makeActiveAllFields: function (isActive) {
      for (var i = 0; i < fieldsetForm.length; i++) {
        if (isActive) {
          fieldsetForm[i].removeAttribute('disabled', '');
        } else {
          fieldsetForm[i].setAttribute('disabled', '');
        }
      }
    }
  };
})();
