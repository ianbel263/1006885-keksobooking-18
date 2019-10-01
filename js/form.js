'use strict';

(function () {
  var ENTER_KEYCODE = 13;
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
    window.data.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    changeElementStatus(fieldsetsAdForm, false);
    changeElementStatus(fieldsetsMapFilterForm, false);
    changeElementStatus(selectsMapFilterForm, false);
    window.pin.renderPins(window.data.mockData);
    window.card.renderCard(window.data.mockData[0]);
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

  checkCapacityValidity();

  selectCapacity.addEventListener('change', function () {
    checkCapacityValidity();
  });

  selectRoomNumber.addEventListener('change', function () {
    checkCapacityValidity();
  });
})();