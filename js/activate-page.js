'use strict';

(function () {
  var mapPinMain = window.data.map.querySelector('.map__pin--main');
  var mapPinMainHalfWidth = Math.floor(mapPinMain.offsetWidth / 2);
  var MAP_PIN_ARROW_HEIGHT = 22;

  var ENTER_KEYCODE = 13;

  var mapPinCoordsLimit = {
    x: {
      min: window.data.ADDRESS_COORDS_LIMIT.x.min - mapPinMainHalfWidth,
      max: window.data.ADDRESS_COORDS_LIMIT.x.max - mapPinMainHalfWidth
    },
    y: {
      min: window.data.ADDRESS_COORDS_LIMIT.y.min - mapPinMain.offsetHeight - MAP_PIN_ARROW_HEIGHT,
      max: window.data.ADDRESS_COORDS_LIMIT.y.max - mapPinMain.offsetHeight - MAP_PIN_ARROW_HEIGHT
    }
  }

  var mapFilterForm = document.querySelector('.map__filters');
  var selectsMapFilterForm = mapFilterForm.querySelectorAll('select');
  var fieldsetsMapFilterForm = mapFilterForm.querySelectorAll('fieldset');

  var fieldsetsAdForm = window.form.adForm.querySelectorAll('fieldset');
  var inputAddress = window.form.adForm.querySelector('input[name=address]');

  var changeElementStatus = function (elementsArr, isTrue) {
    elementsArr.forEach(function (el) {
      el.disabled = isTrue;
    });
  };

  changeElementStatus(fieldsetsAdForm, true);
  changeElementStatus(fieldsetsMapFilterForm, true);
  changeElementStatus(selectsMapFilterForm, true);

  // var setAddressInputValue = function (obj) {
  //   var addressCoords = {
  //     x: obj.x + Math.round(mapPinMain.offsetWidth / 2),
  //     y: obj.y + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT
  //   };

  //   inputAddress.value = addressCoords.x + ', ' + addressCoords.y;
  //   return addressCoords;
  // };

  var isPageActive = false;
  var currentMapPinMainCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    activatePage(isPageActive);
    isPageActive = true;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapPinMainMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      currentMapPinMainCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      // var addressCoords = setAddressInputValue(currentMapPinMainCoords);






      // if (currentMapPinMainCoords.y >= window.data.MAP_PIN_MAIN_Y_MIN && currentMapPinMainCoords.y <= window.data.MAP_PIN_MAIN_Y_MAX && currentMapPinMainCoords.x >= window.data.MAP_PIN_MAIN_X_MIN && currentMapPinMainCoords.x <= window.data.MAP_PIN_MAIN_X_MAX) {
      //   mapPinMain.style.left = currentMapPinMainCoords.x + 'px';
      //   mapPinMain.style.top = currentMapPinMainCoords.y + 'px';
      // }
    };

    var onMapPinMainMouseup = function (upEvt) {
      upEvt.preventDefault();

      // setAddressInputValue(currentMapPinMainCoords);

      document.removeEventListener('mousemove', onMapPinMainMousemove);
      document.removeEventListener('mouseup', onMapPinMainMouseup);

    };

    document.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePage(isPageActive);
      isPageActive = true;
      // setAddressInputValue(currentMapPinMainCoords);
    }
  };

  var activatePage = function (isPageActivated) {
    if (!isPageActivated) {
      window.data.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      changeElementStatus(fieldsetsAdForm, false);
      changeElementStatus(fieldsetsMapFilterForm, false);
      changeElementStatus(selectsMapFilterForm, false);
      window.pin.renderPins(window.data.mockData);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
})();
