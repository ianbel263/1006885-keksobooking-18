'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = map.querySelector('.map__pins');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var NUMBER_OF_ADS = 8;
var MOCK = {
  author: {
    avatar: 'img/avatars/user',
  },
  offer: {
    title: ['Первое предложение', 'Второе предложение', 'Третье предложение', 'Четвертое предложение', 'Пятое предложение'],
    address: '',
    price: {
      min: 0,
      max: 10000
    },
    type: ['palace', 'flat', 'house', 'bungalo'],
    rooms: {
      min: 1,
      max: 5
    },
    guests: {
      min: 0,
      max: 5
    },
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    description: ['Aliquip ea magna. Sit duis deserunt cupidatat occaecat non officia laborum dolor tempor enim amet.', 'Aute amet ex nisi in culpa laboris ex amet amet exercitation eiusmod labore ullamco elit pariatur in consequat tempor.','Fugiat ullamco elit do ut velit amet quis mollit in proident sit ullamco sunt.'],
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

var generateRandomArr = function (arr, minElements) {
  var arrNew = [];
  if (minElements > arr.length) {
    minElements = arr.length;
  }
  var iMax = getRandomInt(minElements, arr.length);
  if (minElements > 0) {
    minElements = 1;
  }
  for (var i = 0; i < iMax; i++) {
    if (getRandomInt(minElements, 1) === 1) {
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
        title: MOCK.offer.title[getRandomInt(0, MOCK.offer.title.length - 1)],
        address: MOCK.offer.address,
        price: getRandomInt(MOCK.offer.price.min, MOCK.offer.price.max),
        type: MOCK.offer.type[getRandomInt(0, MOCK.offer.type.length - 1)],
        rooms: getRandomInt(MOCK.offer.rooms.min, MOCK.offer.rooms.max),
        guests: getRandomInt(MOCK.offer.guests.min, MOCK.offer.guests.max),
        checkin: MOCK.offer.checkin[getRandomInt(0, MOCK.offer.checkin.length - 1)],
        checkout: MOCK.offer.checkout[getRandomInt(0, MOCK.offer.checkout.length - 1)],
        features: generateRandomArr(MOCK.offer.features, 0),
        description: MOCK.offer.description[getRandomInt(0, MOCK.offer.description.length - 1)],
        photos: generateRandomArr(MOCK.offer.photos, 1)
      },
      location: {
        x: getRandomInt(0, map.clientWidth - PIN_WIDTH),
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
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (arr) {

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }

  mapPins.appendChild(fragment);
};

var translateAdType = function (adType) {
  if (adType === 'palace') {
    var typeTranslated = 'Дворец';
  }
  if (adType === 'flat') {
    typeTranslated = 'Квартира';
  }
  if (adType === 'bungalo') {
    typeTranslated = 'Бунгало';
  }
  if (adType === 'house') {
    typeTranslated = 'Дом';
  }

  return typeTranslated;
};

// var renderAdFeaturesList = function (adFeatures) {
//   var featuresList = cardTemplate.querySelector('.popup__features');
//   var featuresItems = featuresList.querySelectorAll('.popup__feature');
//   featuresItems.forEach(function (el) {
//     featuresList.removeChild(el);
//   });

//   for (var i = 0; i < adFeatures.length; i++) {
//     var newFeatureItem = document.createElement('li');
//     newFeatureItem.className = 'popup__feature popup__feature--' + adFeatures[i];
//     featuresList.appendChild(newFeatureItem);
//   }

//   return featuresList;
// };

var renderAdFeatures = function (el, arr) {
  var list = el.querySelector('.popup__features');
  var items = list.querySelectorAll('.popup__feature');
  items.forEach(function(element) {
    list.removeChild(element);
  });
  for (var i = 0; i < arr.length; i++) {
    var newItem = document.createElement('li');
    newItem.className = 'popup__feature popup__feature--' + arr[i];
    list.appendChild(newItem);
  }
};

var renderAdPhotos = function (el, arr) {
  el.querySelector('.popup__photo').src = arr[0];
  for (var i = 1; i < arr.length; i++) {
    var newImg = el.querySelector('.popup__photo').cloneNode(true);
    newImg.src = arr[i];
    el.querySelector('.popup__photos').appendChild(newImg);
  }
};

var renderCard = function (card) {
  var fragment = document.createDocumentFragment();
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = translateAdType(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  // cardElement.replaceChild(renderAdFeaturesList(card.offer.features), cardElement.querySelector('.popup__features'));
  renderAdFeatures(cardElement, card.offer.features);
  renderAdPhotos(cardElement, card.offer.photos);

  fragment.appendChild(cardElement);
  map.insertBefore(fragment, mapFiltersContainer);

  // return cardElement;
};

var data = generateData();
renderPins(data);
renderCard(data[0]);
