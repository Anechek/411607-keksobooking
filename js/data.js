'use strict';
window.data = (function () {
  var AUTHORS_COUNT = 8;
  var AUTORS_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var IMG_STRING = 'img/avatars/userXX.png';
  var TITLE_OF_HOUSES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPES_OF_HOUSES = ['flat', 'house', 'bungalo'];
  var COUNT_GUESTS = 3; // максимальное количество гостей в одной комнате
  var TIMES_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var TYPES_OF_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MIN_INITIAL_ADDRESS_X = 300;
  var MAX_INITIAL_ADDRESS_X = 900;
  var MIN_INITIAL_ADDRESS_Y = 100;
  var MAX_INITIAL_ADDRESS_Y = 500;
  var MIN_COUNT_ROOMS = 1;
  var MAX_COUNT_ROOMS = 5;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  // Функция для получения целого случайного числа в заданном диапазоне

  function getRandomIntegerValue(minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  // Функция для получения массива преимуществ

  function getArrayFeatures(count) {
    var arrayFeatures = [];
    var features = TYPES_OF_FEATURES.slice();
    var randomArrayIndex = 0;
    for (var i = 0; i < count; i++) {
      randomArrayIndex = getRandomIntegerValue(0, features.length - 1);
      arrayFeatures[i] = features[randomArrayIndex];
      features.splice(randomArrayIndex, 1);
    }
    return arrayFeatures;
  }

  // Функция заполнения массива объявлений согласно заданию

  function getArrayAdverts() {
    var array = [];
    var numbers = AUTORS_NUMBERS.slice();
    var numbersHouses = TITLE_OF_HOUSES.slice();
    var re = /XX/g;
    var randomValue = 0;
    var randomValueTitle = 0;
    var randomValueTypes = 0;
    var randomValueRooms = 0;
    var randomValueCheckIn = 0;
    var randomValueCheckOut = 0;
    var randomValueAddressX = 0;
    var randomValueAddressY = 0;
    for (var i = 0; i < AUTHORS_COUNT; i++) {
      randomValue = getRandomIntegerValue(0, numbers.length - 1);
      randomValueTitle = getRandomIntegerValue(0, numbersHouses.length - 1);
      randomValueAddressX = getRandomIntegerValue(MIN_INITIAL_ADDRESS_X, MAX_INITIAL_ADDRESS_X);
      randomValueAddressY = getRandomIntegerValue(MIN_INITIAL_ADDRESS_Y, MAX_INITIAL_ADDRESS_Y);
      randomValueTypes = getRandomIntegerValue(0, TYPES_OF_HOUSES.length - 1);
      randomValueRooms = getRandomIntegerValue(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS);
      randomValueCheckIn = getRandomIntegerValue(0, TIMES_CHECK_IN_OUT.length - 1);
      randomValueCheckOut = getRandomIntegerValue(0, TIMES_CHECK_IN_OUT.length - 1);
      array.push(
          {
            autor: {
              avatar: IMG_STRING.replace(re, numbers[randomValue])
            },
            offer: {
              title: numbersHouses[randomValueTitle],
              address: 'x: ' + randomValueAddressX + ' ' + 'y: ' + randomValueAddressY,
              price: getRandomIntegerValue(MIN_PRICE, MAX_PRICE),
              type: TYPES_OF_HOUSES[randomValueTypes],
              rooms: randomValueRooms,
              guests: getRandomIntegerValue(1, randomValueRooms * COUNT_GUESTS),
              checkin: TIMES_CHECK_IN_OUT[randomValueCheckIn],
              checkout: TIMES_CHECK_IN_OUT[randomValueCheckOut],
              features: getArrayFeatures(getRandomIntegerValue(1, TYPES_OF_FEATURES.length)),
              description: '',
              photos: []
            },
            location: {
              x: randomValueAddressX,
              y: randomValueAddressY
            }
          });
      numbers.splice(randomValue, 1);
      numbersHouses.splice(randomValueTitle, 1);
    }
    return array;
  }

  var adverts = getArrayAdverts();

  return {
    TIMES_CHECK_IN_OUT: TIMES_CHECK_IN_OUT,
    adverts: adverts
  };
})();
