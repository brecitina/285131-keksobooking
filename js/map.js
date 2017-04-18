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
  var i = Math.random() * (array.length);

  i = Math.floor(i);
  return array[i];
}

var getArrayOfRandomLength = function (array) {
  var newArray = [];
  var newArrayLength = Math.floor(getRandomNumber(1, array.length + 1));

  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

var makeAd = function (j) {
  var location = {
    x: getRandomNumber(300, 900),
    y: getRandomNumber(100, 500)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + (j + 1) + '.png'
    },
    offer: {
      title: TITLES[j],
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

var makeAds = function (numberOfAds) {
  var nearbyAds = [];

  for (var j = 0; j < numberOfAds; j++) {
    nearbyAds.push(makeAd(j));
  }
  return nearbyAds;
};

makeAds(8);
