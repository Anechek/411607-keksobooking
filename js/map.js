'use strict';
var AUTHORS_COUNT = 8;
var AUTORS_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var IMG_STRING = 'img/avatars/userXX.png';
var TITLE_OF_HOUSES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var INITIAL_ADDRESS_X = 'x:';
var INITIAL_ADDRESS_Y = 'y:';
var TYPES_OF_HOUSES = ['flat', 'house', 'bungalo'];
var COUNT_GUESTS = 3; // максимальное количество гостей в одной комнате
var TIMES_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var TYPES_OF_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MAP_PIN_WIDTH_HALF = 20;
var MAP_PIN_HEIGHT_PLUS10 = 50;
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
    randomValueAddressX = getRandomIntegerValue(300, 900);
    randomValueAddressY = getRandomIntegerValue(100, 500);
    randomValueTypes = getRandomIntegerValue(0, TYPES_OF_HOUSES.length - 1);
    randomValueRooms = getRandomIntegerValue(1, 5);
    randomValueCheckIn = getRandomIntegerValue(0, TIMES_CHECK_IN_OUT.length - 1);
    randomValueCheckOut = getRandomIntegerValue(0, TIMES_CHECK_IN_OUT.length - 1);
    array.push(
        {
          autor: {
            avatar: IMG_STRING.replace(re, numbers[randomValue])
          },
          offer: {
            title: numbersHouses[randomValueTitle],
            address: INITIAL_ADDRESS_X + randomValueAddressX + ' ' + INITIAL_ADDRESS_Y + randomValueAddressY,
            price: getRandomIntegerValue(1000, 1000000),
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
// Функция для создания баттонов для каждого маппина
function addMapPins(advertsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertsArray.length; i++) {
    var button = document.createElement('button');
    button.style.left = '' + (advertsArray[i].location.x - MAP_PIN_WIDTH_HALF) + 'px';
    button.style.top = '' + (advertsArray[i].location.y - MAP_PIN_HEIGHT_PLUS10) + 'px';
    button.className = 'map__pin';
    button.innerHTML = '<img src="' + advertsArray[i].autor.avatar + '" width="40" height="40" draggable="false">';
    fragment.appendChild(button);
  }
  mapPinsBlock.appendChild(fragment);
}
// Функция для склонения числительных
function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
var adverts = getArrayAdverts();
document.querySelector('.map').classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
addMapPins(adverts);
var advertsTemplate = document.querySelector('template').content;
var advertElement = advertsTemplate.cloneNode(true);
advertElement.querySelector('h3').textContent = adverts[0].offer.title;
var paragraphs = advertElement.querySelectorAll('p');
paragraphs[0].textContent = adverts[0].offer.address;
paragraphs[1].innerHTML = '' + adverts[0].offer.price + '&#x20bd;/ночь';
paragraphs[2].textContent = '' + adverts[0].offer.rooms + ' ' + declOfNum(adverts[0].offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + adverts[0].offer.guests + ' ' + declOfNum(adverts[0].offer.guests, ['гостя', 'гостей', 'гостей']);
paragraphs[3].textContent = 'Заезд после ' + adverts[0].offer.checkin + ',' + ' выезд до ' + adverts[0].offer.checkout;
paragraphs[4].textContent = adverts[0].offer.description;
var h4String = '';
if (adverts[0].offer.type === 'flat') {
  h4String = h4String + 'Квартира';
} else {
  if (adverts[0].offer.type === 'house') {
    h4String = h4String + 'Дом';
  } else {
    h4String = h4String + 'Бунгало';
  }
}
advertElement.querySelector('h4').textContent = h4String;
advertElement.querySelector('.popup__avatar').setAttribute('src', adverts[0].autor.avatar);
var featuresElement = advertElement.querySelector('.popup__features');
// надо очистить все элементы li которые содержались изначально в шаблоне
while (featuresElement.firstChild) {
  featuresElement.removeChild(featuresElement.firstChild);
}
adverts[0].offer.features.forEach(function (v, i, arr) {
  var li = document.createElement('li');
  li.className = 'feature feature--' + arr[i];
  featuresElement.appendChild(li);
});
var map = document.querySelector('.map');
var beforeElement = document.querySelector('.map__filters-container');
map.insertBefore(advertElement, beforeElement);
