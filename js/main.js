'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var NUMBER_OF_ADS = 8;
var MOCK = {
  author: {
    avatar: 'img/avatars/user{{xx}}.png',
  },
  offer: {
    title: '',
    address: '{{location.x}}, {{location.y}}',
    price: {
      min: 0,
      max: 100000
    },
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: 1,
    guests: 0,
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: '',
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },
  location: {
    x: 600,
    y: 350
  }
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateRandomArr = function (arr) {
  var arrNew = [];
  for (var i = 0; i < getRandomInt(0, arr.length); i++) {
    if (getRandomInt(0, 1) === 1) {
      arrNew.push(arr[i]);
    }
  }
  return arrNew;
};

var generateData = function () {
  var arr = [];
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    arr[i] = {
      author: {
        avatar: MOCK.author.avatar + 0 + (i + 1) + '.png',
      },
      offer: {
        title: Math.random().toString(36).substring(3),
        address: MOCK.offer.address,
        price: getRandomInt(MOCK.offer.price.min, MOCK.offer.price.max),
        type: MOCK.offer.type[getRandomInt(0, MOCK.offer.type.length - 1)],
        rooms: getRandomInt(0, 3),
        guests: getRandomInt(0, 3),
        checkin: MOCK.offer.checkin[getRandomInt(0, MOCK.offer.checkin.length - 1)],
        checkout: MOCK.offer.checkout[getRandomInt(0, MOCK.offer.checkout.length - 1)],
        features: generateRandomArr(MOCK.offer.features),
        description: Math.random().toString(36).substring(3),
        photos: generateRandomArr(MOCK.offer.photos)
      },
      location: {
        x: getRandomInt(0, map.clientWidth),
        y: getRandomInt(130, 630)
      }
    };
    arr[i].offer.address = arr[i].location.x + ', ' + arr[i].location.y;
  }
  return arr;
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px;';
  pinElement.childNodes[0].src = pin.author.avatar;
  pinElement.childNodes[0].alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (arr) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  mapPins.appendChild(fragment);
};

renderPins(generateData());

