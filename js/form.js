'use strict';
(function () {
  var MIN_PRICE_TYPE_OF_HOUSES = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };
  var MAX_COUNT_GUESTS = 100;
  // Функция для обработчика ввода времени заезда
  var onTimeInChange = function (evt) {
    var target = evt.target;
    timeOutChange.value = target.value;
  };
  // Функция для обработчика ввода времени выезда
  var onTimeOutChange = function (evt) {
    var targetOut = evt.target;
    timeInChange.value = targetOut.value;
  };
  function setMinPrice(minPrice) {
    priceChange.min = minPrice;
  }
  // Функция для обработчика ввода типа жилья
  var onTypeOfHouseChange = function (evt) {
    var target = evt.target;
    priceChange.min = MIN_PRICE_TYPE_OF_HOUSES[target.value];
  };
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
      // npm test  не попускает два var для i  в одной функции
      for (var j = 1; j <= roomValue; j++) {
        unDisableCapacities(j);
      }
    }
  };
  window.noticeForm = document.querySelector('.notice__form');
  // var noticeForm = document.querySelector('.notice__form');
  // Обработчик ввода времени заезда
  var timeInChange = window.noticeForm.querySelector('#timein');
  var timeOutChange = window.noticeForm.querySelector('#timeout');
  timeInChange.addEventListener('change', onTimeInChange);
  timeOutChange.addEventListener('change', onTimeOutChange);
  // Обработчик ввода типа жилья
  var typeChange = window.noticeForm.querySelector('#type');
  var priceChange = window.noticeForm.querySelector('#price');
  typeChange.addEventListener('change', onTypeOfHouseChange);
  // Обработчик ввода количества комнат
  var roomsChange = window.noticeForm.querySelector('#room_number');
  var capacityChange = window.noticeForm.querySelector('#capacity');
  var capacityArray = capacityChange.querySelectorAll('option');
  roomsChange.addEventListener('change', onRoomsChange);
  setMinPrice(MIN_PRICE_TYPE_OF_HOUSES['flat']);
  setValidGuests(1);
})();
