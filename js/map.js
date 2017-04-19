'use strict';
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var TYPES = [
  'flat',
  'house',
  'bungalo'];

var CHECKS = [
  '12:00',
  '13:00',
  '14:00'];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];

function getRandomNumber(min, max) {
  return min + Math.random() * (max - min);
}

function getRandomFromArray(array) {
  var rand = Math.random() * (array.length);

  return array[Math.floor(rand)];
}

var getArrayOfRandomLength = function (array) {
  var newArray = [];
  var newArrayLength = Math.floor(getRandomNumber(1, array.length + 1));

  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

var makeAd = function (idx) {
  var location = {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(100, 500)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + (idx + 1) + '.png'
    },
    offer: {
      title: TITLES[idx],
      address: location.x + ', ' + location.y,
      price: getRandomNumber(1000, 1000000),
      type: getRandomFromArray(TYPES),
      rooms: Math.floor(getRandomNumber(1, 6)), // 1 - 5 комнат
      quests: Math.floor(getRandomNumber(1, 200)),
      checkin: getRandomFromArray(CHECKS),
      checkout: getRandomFromArray(CHECKS),
      features: getArrayOfRandomLength(FEATURES),
      description: '',
      photos: []
    },
    location: location
  };
};

var nearbyAds = []; // Массив с соседними объявлениями

var makeAds = function (numberOfAds) {
  for (var i = 0; i < numberOfAds; i++) {
    nearbyAds.push(makeAd(i));
  }
  return nearbyAds;
};

makeAds(8);

var pinWidth = 40; // Возможно, объявление этих переменных стоит засунуть в саму функцию?
var pinHeight = 40;

var makePin = function (idx) {
  var pin = document.createElement('div');

  pin.className = 'pin';
  pin.style = 'left: ' + (nearbyAds[idx].location.x + pinWidth / 2) + 'px; top: ' + (nearbyAds[idx].location.y + pinHeight) + 'px';
  pin.insertAdjacentHTML('afterbegin', '<img>');
  pin.firstChild.src = nearbyAds[idx].author.avatar;
  pin.firstChild.className = 'rounded';
  pin.firstChild.width = String(pinWidth);
  pin.firstChild.height = String(pinHeight);

  return pin;
};

// Зачем писать следующий код?
// var pins = [];
//
// var makePins = function () {
//
//   for (var i = 0; i < nearbyAds.length; i++) {
//    pins.push(makePin(i));
//  }
//  return pins;
// };
//
// makePins();
// Бесцельная часть кода закончилась.

var drawPins = function () {
  var pinsList = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < nearbyAds.length; i++) {
    fragment.appendChild(makePin(i));
  }
  pinsList.appendChild(fragment);
};

drawPins();

