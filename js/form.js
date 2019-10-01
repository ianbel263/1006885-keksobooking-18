'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MAP_PIN_ARROW_HEIGHT = 22;

  var mapPinMain = window.data.map.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var mapFilterForm = document.querySelector('.map__filters');
  var selectsMapFilterForm = mapFilterForm.querySelectorAll('select');
  var fieldsetsMapFilterForm = mapFilterForm.querySelectorAll('fieldset');
  var inputAddress = adForm.querySelector('input[name=address]');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

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

  var setAddressInputValue = function () {
    mapPinMainY = Math.floor(parseInt((mapPinMain.style.top), 10) + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT);
    inputAddress.value = mapPinMainX + ', ' + mapPinMainY;
  };

  var doMapPinMainPressed = function () {
    activatePage();
    setAddressInputValue();
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCardPopup();
    }
  };

  var onMapPinMainMousedown = function () {
    doMapPinMainPressed();
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      doMapPinMainPressed();
    }
  };

  var openCardPopup = function (iterator) {
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (el, index) {
      el.classList.add('hidden');

      if (iterator === index) {
        el.classList.remove('hidden');
      }

      el.querySelector('.popup__close').addEventListener('click', function () {
        closeCardPopup();
      });

      el.querySelector('.popup__close').addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          closeCardPopup();
        }
      });
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeCardPopup = function () {
    var cards = document.querySelectorAll('.map__card');
    cards.forEach(function (el) {
      el.classList.add('hidden');
    });
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    changeElementStatus(fieldsetsAdForm, false);
    changeElementStatus(fieldsetsMapFilterForm, false);
    changeElementStatus(selectsMapFilterForm, false);
    window.pin.renderPins(window.data.mockData);

    var mapPins = window.data.map.querySelectorAll('.map__pin + :not(.map__pin--main)');

    mapPins.forEach(function (el, index) {
      window.card.renderCard(window.data.mockData[index]);
      el.addEventListener('click', function () {
        openCardPopup(index);
      });
      el.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          openCardPopup(index);
        }
      });
    });

    // mapPins.forEach(function (el, index) {
    //   var onMapPinClick = function () {
    //     var card = document.querySelector('.map__card');
    //     if (card !== null) {
    //       card.remove();
    //     }
    //     window.card.renderCard(window.data.mockData[index]);
    //   };
    //   el.addEventListener('click', onMapPinClick);
    // });

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
})();
