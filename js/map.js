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
      price: Math.floor(getRandomNumber(1000, 1000001)),
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

var mainAd = document.querySelector('#lodge-template').content.cloneNode(true);

var fillOutMainAdFrom = function (ourObject) {
  function fillType(ad) {
    if (ad.offer.type === 'flat') {
      mainAd.querySelector('.lodge__type').textContent = 'Квартира';
    } else if (ad.offer.types === 'bungalo') {
      mainAd.querySelector('.lodge__type').textContent = 'Бунгало';
    } else {
      mainAd.querySelector('.lodge__type').textContent = 'Дом';
    }
  }

  function fillFeatures(ad) {
    for (var i = 0; i < ad.offer.features.length; i++) {
      var newSpan = document.createElement('span');
      newSpan.classList.add('feature__image');
      newSpan.classList.add('feature__image--' + ad.offer.features[i]);
      mainAd.querySelector('.lodge__features').appendChild(newSpan);
    }
  }

  mainAd.querySelector('.lodge__title').textContent = ourObject.offer.title;
  mainAd.querySelector('.lodge__address').textContent = ourObject.offer.address;
  mainAd.querySelector('.lodge__price').innerHTML = ourObject.offer.price + '&#x20bd;/ночь';
  fillType(ourObject);
  mainAd.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ourObject.offer.quests + ' гостей в ' + ourObject.offer.rooms + ' комнатах';
  mainAd.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ourObject.offer.checkin + ', выезд до ' + ourObject.offer.checkout;
  fillFeatures(ourObject);
  mainAd.querySelector('.lodge__description').textContent = ourObject.offer.description;
};

fillOutMainAdFrom(nearbyAds[0]);

var replaceMainAd = function () {
  var whatWeChange = document.querySelector('.dialog__panel');
  whatWeChange.parentElement.replaceChild(mainAd, whatWeChange);
};

replaceMainAd();

var replaceSrc = function (ourObject) {
  var whatWeChange = document.querySelector('.dialog__title').firstChild;
  whatWeChange.src = ourObject.author.avatar;
};

replaceSrc(nearbyAds[0]);
