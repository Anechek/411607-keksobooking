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
var MIN_INITIAL_ADDRESS_X = 300;
var MAX_INITIAL_ADDRESS_X = 900;
var MIN_INITIAL_ADDRESS_Y = 100;
var MAX_INITIAL_ADDRESS_Y = 500;
var MIN_COUNT_ROOMS = 1;
var MAX_COUNT_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAP_PIN_WIDTH_HALF = 20;
var MAP_PIN_HEIGHT_PLUS10 = 50;
var OPTIONS_NUMBERS_OF_ROOMS = ['комната', 'комнаты', 'комнат'];
var OPTIONS_NUMBERS_OF_GUESTS = ['гостя', 'гостей', 'гостей'];
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
            address: INITIAL_ADDRESS_X + randomValueAddressX + ' ' + INITIAL_ADDRESS_Y + randomValueAddressY,
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
// Функция для определения заголовка
function getTitleDependOnType(type) {
  var obj = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return obj[type];
}
// Функция заполнения объявления, созданного из шаблона, данными из параметра advert
function addAdvertOnMap(advert) {
  advertElement.querySelector('h3').textContent = advert.offer.title;
  var paragraphs = advertElement.querySelectorAll('p');
  paragraphs[0].textContent = advert.offer.address;
  paragraphs[1].innerHTML = '' + advert.offer.price + '&#x20bd;/ночь';
  paragraphs[2].textContent = '' + advert.offer.rooms + ' ' + declOfNum(advert.offer.rooms, OPTIONS_NUMBERS_OF_ROOMS) + ' для ' + advert.offer.guests + ' ' + declOfNum(advert.offer.guests, OPTIONS_NUMBERS_OF_GUESTS);
  paragraphs[3].textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;
  paragraphs[4].textContent = advert.offer.description;
  advertElement.querySelector('h4').textContent = getTitleDependOnType(advert.offer.type);
  advertElement.querySelector('.popup__avatar').setAttribute('src', advert.autor.avatar);
  var featuresElement = advertElement.querySelector('.popup__features');
  // надо очистить все элементы li которые содержались изначально в шаблоне
  featuresElement.innerHTML = '';
  var fragment = document.createDocumentFragment();
  advert.offer.features.forEach(function (v, i, arr) {
    var li = document.createElement('li');
    li.className = 'feature feature--' + arr[i];
    fragment.appendChild(li);
  });
  featuresElement.appendChild(fragment);
}
var adverts = getArrayAdverts();
document.querySelector('.map').classList.remove('map--faded');
var mapPinsBlock = document.querySelector('.map__pins');
// addMapPins(adverts);
var advertsTemplate = document.querySelector('template').content;
var advertElement = advertsTemplate.cloneNode(true);
// пришлось оставить вызов этой функции, чтобы пройти проверку npm test
addAdvertOnMap(adverts[0]);
var map = document.querySelector('.map');
var beforeElement = document.querySelector('.map__filters-container');
map.insertBefore(advertElement, beforeElement);
// задание: подробности
// затемнить карту 
document.querySelector('.map').classList.add('map--faded');
var noticeForm = document.querySelector('.notice__form');
var fieldsetForm = noticeForm.querySelectorAll('fieldset');
for (var i = 0; i < fieldsetForm.length; i++) {
  fieldsetForm[i].setAttribute('disabled', '');
}
var articleTemp = document.querySelector('article');
articleTemp.setAttribute('hidden', '');
var buttonTemp = document.querySelectorAll('button.map__pin');
buttonTemp[buttonTemp.length - 1].setAttribute('hidden', '');
var mapPinMain = document.querySelector('.map__pin--main');
// var mapPins = document.querySelectorAll('.map__pin');
// var mapPins = [];
var onButtonMouseup = function () {
  // console.log('mouseuped in .map__pin--main');
  document.querySelector('.map').classList.remove('map--faded');
  noticeForm.classList.remove('.notice__form--disabled');
  articleTemp.setAttribute('hidden', '');
  addMapPins(adverts);
  // mapPins = document.querySelectorAll('.map__pin');
  for (i = 0; i < fieldsetForm.length; i++) {
    fieldsetForm[i].removeAttribute('disabled', '');
  }
  mapPinMain.removeEventListener('mouseup', onButtonMouseup);
};
mapPinMain.addEventListener('mouseup', onButtonMouseup);
// var mapPins = document.querySelectorAll('.map__pin');
// mapPin.addEventListener('click', function (evt) {
// mapPins.onclick = function(evt) {
//  var target = evt.target; // где был клик?
//  console.log('Clicked mapPin');
//  // if (target.tagName != 'TD') return; // не на TD? тогда не интересует
//  // highlight(target); // подсветить TD
// };
// var clickedElement = null;
// 
// пытаюсь через for сделать обаботчик для каждй кнопки button c классом .map__pin
// проблема в том, как получить переменную mapPins, содержащюю ВСЕ 8 добавленных button's
var mapPins = mapPinsBlock.querySelectorAll('.map__pin');
for (i = 0; i < mapPins.length; i++) {
  mapPins[i].addEventListener('click', function () {
  // console.log('Clicked mapPin');
  //      if (document.querySelector('map__pin--active') != null) {
  //        // var mapPinActive = mapPin[i].querySelector('map__pin--active');
  //        if (mapPin[i].className === 'map__pin--active') {
  //          mapPin[i].classList.remove('map__pin--active');
  //        }
  //      //mapPin[i].classList.add('map__pin--active');
  //      }
  //      clickedElement = evt.currentTarget;
  //      clickedElement.classList.add('map__pin--active');
  });
}
