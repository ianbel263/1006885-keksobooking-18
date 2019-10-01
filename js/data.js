'use strict';

(function () {
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
  var PIN_WIDTH = 50;
  var map = document.querySelector('.map');

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

  window.data = {
    map: map,
    mockData: generateData()
  };
})();
