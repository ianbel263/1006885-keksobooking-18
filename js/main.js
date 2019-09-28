'use strict';

var ENTER_KEYCODE = 13;
var PIN_WIDTH = 50;
var MAP_PIN_ARROW_HEIGHT = 22;
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
    description: ['Aliquip ea magna. Sit duis deserunt cupidatat occaecat non officia laborum dolor tempor enim amet.', 'Aute amet ex nisi in culpa laboris ex amet amet exercitation eiusmod labore ullamco elit pariatur in consequat tempor.', 'Fugiat ullamco elit do ut velit amet quis mollit in proident sit ullamco sunt.'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  },
  location: {
    x: 600,
    y: 350
  }
};

var map = document.querySelector('.map');
var mapPin = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var adForm = document.querySelector('.ad-form');
var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
var mapFilterForm = document.querySelector('.map__filters');
var selectsMapFilterForm = mapFilterForm.querySelectorAll('select');
var fieldsetsMapFilterForm = mapFilterForm.querySelectorAll('fieldset');
var inputAddress = adForm.querySelector('input[name=address]');
var selectRoomNumber = adForm.querySelector('#room_number');
var selectCapacity = adForm.querySelector('#capacity');

var mapPinMainX = Math.floor(parseInt((mapPinMain.style.left), 10) + mapPinMain.offsetWidth / 2);
var mapPinMainY = Math.floor(parseInt((mapPinMain.style.top), 10) + mapPinMain.offsetHeight / 2);

inputAddress.value = mapPinMainX + ', ' + mapPinMainY;
inputAddress.readOnly = true;

var changeElementStatus = function (elementsArr, status) {
  elementsArr.forEach(function (el) {
    el.disabled = status;
  });
};

changeElementStatus(fieldsetsAdForm, true);
changeElementStatus(fieldsetsMapFilterForm, true);
changeElementStatus(selectsMapFilterForm, true);


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
        x: getRandomInt(0, map.clientWidth - PIN_WIDTH / 2),
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
  mapPin.appendChild(fragment);
};

var renderCard = function (card) {
  var fragment = document.createDocumentFragment();
  var cardElement = cardTemplate.cloneNode(true);
  var featuresList = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

  if (card.offer.type === 'palace') {
    var typeTranslated = 'Дворец';
  } else if (card.offer.type === 'flat') {
    typeTranslated = 'Квартира';
  } else if (card.offer.type === 'bungalo') {
    typeTranslated = 'Бунгало';
  } else if (card.offer.type === 'house') {
    typeTranslated = 'Дом';
  }

  cardElement.querySelector('.popup__type').textContent = typeTranslated;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  featuresList.innerHTML = '';
  for (var i = 0; i < card.offer.features.length; i++) {
    var newItem = document.createElement('li');
    newItem.className = 'popup__feature popup__feature--' + card.offer.features[i];
    featuresList.appendChild(newItem);
  }

  cardElement.querySelector('.popup__photo').src = card.offer.photos[0];
  for (i = 1; i < card.offer.photos.length; i++) {
    var newImg = cardElement.querySelector('.popup__photo').cloneNode(true);
    newImg.src = card.offer.photos[i];
    cardElement.querySelector('.popup__photos').appendChild(newImg);
  }

  fragment.appendChild(cardElement);
  map.insertBefore(fragment, mapFiltersContainer);
};

var data = generateData();

var setAddressInputValue = function () {
  mapPinMainY = Math.floor(parseInt((mapPinMain.style.top), 10) + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT);
  inputAddress.value = mapPinMainX + ', ' + mapPinMainY;
};

var onMapPinMainMousedown = function () {
  activatePage();
  setAddressInputValue();
};

var onMapPinMainKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
    setAddressInputValue();
  }
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  changeElementStatus(fieldsetsAdForm, false);
  changeElementStatus(fieldsetsMapFilterForm, false);
  changeElementStatus(selectsMapFilterForm, false);
  renderPins(data);
  renderCard(data[0]);
  mapPinMain.removeEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);
};

mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

var checkCapacityValidity = function () {
  var roomValue = parseInt(selectRoomNumber.value, 10);
  var capacityValue = parseInt(selectCapacity.value, 10);
  if (roomValue < capacityValue) {
    if (roomValue !== 100 || capacityValue !== 0) {
      selectCapacity.setCustomValidity('Количество гостей не должно быть больше количества комнат');
    }
  } else if (roomValue === 100 && capacityValue !== 0) {
    selectCapacity.setCustomValidity('Для 100 комнат выберите значение "не для гостей"');
  } else if (roomValue !== 100 && capacityValue === 0) {
    selectCapacity.setCustomValidity('Если выбираете "не для гостей", укажите количество комнат, равное 100');
  } else if (roomValue === 100 && capacityValue === 0) {
    selectCapacity.setCustomValidity('');
  } else {
    selectCapacity.setCustomValidity('');
  }
};

// var checkCapacityValidity = function () {
//   var roomValue = parseInt(selectRoomNumber.value, 10);
//   var capacityValue = parseInt(selectCapacity.value, 10);
//   switch (capacityValue) {
//     case capacityValue > roomValue:


//     default:
//       selectCapacity.setCustomValidity('');
//   }
// };

checkCapacityValidity();

selectCapacity.addEventListener('change', function () {
  checkCapacityValidity();
});

selectRoomNumber.addEventListener('change', function () {
  checkCapacityValidity();
});
