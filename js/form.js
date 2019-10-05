'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');
  var inputAddress = adForm.querySelector('input[name=address]');

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainHalfWidth = Math.round(mapPinMain.offsetWidth / 2);
  var MAP_PIN_ARROW_HEIGHT = 22;

  var currentMapPinMainCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  var setAddressInputValue = function (obj, isPageActive) {
    var coordX;
    var coordY;
    if (isPageActive) {
      coordY = obj.y + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT;
    } else {
      coordY = obj.y + Math.round(mapPinMain.offsetHeight / 2);
    }
    coordX = obj.x + mapPinMainHalfWidth;
    inputAddress.value = coordX + ', ' + coordY;
  };

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

  var checkPriceValidity = function () {
    switch (selectType.value) {
      case 'flat':
        inputPrice.min = 1000;
        inputPrice.placeholder = '1000';
        break;
      case 'bungalo':
        inputPrice.min = 0;
        inputPrice.placeholder = '0';
        break;
      case 'house':
        inputPrice.min = 5000;
        inputPrice.placeholder = '5000';
        break;
      case 'palace':
        inputPrice.min = 10000;
        inputPrice.placeholder = '10000';
        break;
    }
  };

  var checkTimeValidity = function (time1, time2) {
    switch (time1.value) {
      case '12:00':
        time2.value = '12:00';
        break;
      case '13:00':
        time2.value = '13:00';
        break;
      case '14:00':
        time2.value = '14:00';
        break;
    }
  };

  checkCapacityValidity();
  selectCapacity.addEventListener('change', function () {
    checkCapacityValidity();
  });
  selectRoomNumber.addEventListener('change', function () {
    checkCapacityValidity();
  });

  checkPriceValidity();
  selectType.addEventListener('change', function () {
    checkPriceValidity();
  });
  checkTimeValidity(selectTimeIn, selectTimeOut);

  selectTimeIn.addEventListener('change', function () {
    checkTimeValidity(selectTimeIn, selectTimeOut);
  });
  selectTimeOut.addEventListener('change', function () {
    checkTimeValidity(selectTimeOut, selectTimeIn);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // window.backend.save(new FormData(window.actPage.adForm), function () {

    // }, window.actPage.onError);
  });

  window.form = {
    adForm: adForm,
    mapPinMain: mapPinMain,
    mapPinMainHalfWidth: mapPinMainHalfWidth,
    MAP_PIN_ARROW_HEIGHT: MAP_PIN_ARROW_HEIGHT,
    currentMapPinMainCoords: currentMapPinMainCoords,
    setAddressInputValue: setAddressInputValue
  };
})();
