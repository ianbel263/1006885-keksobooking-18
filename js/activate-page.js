'use strict';

(function () {
  var mapPinMain = window.data.map.querySelector('.map__pin--main');
  var mapPinMainHalfWidth = Math.floor(mapPinMain.offsetWidth / 2);
  var MAP_PIN_ARROW_HEIGHT = 22;

  var ENTER_KEYCODE = 13;
  var ADDRESS_COORDS_LIMIT = {
    x: {
      min: 0,
      max: window.data.map.offsetWidth
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var mapPinCoordsLimit = {
    x: {
      min: ADDRESS_COORDS_LIMIT.x.min - mapPinMainHalfWidth,
      max: ADDRESS_COORDS_LIMIT.x.max - mapPinMainHalfWidth
    },
    y: {
      min: ADDRESS_COORDS_LIMIT.y.min - mapPinMain.offsetHeight - MAP_PIN_ARROW_HEIGHT,
      max: ADDRESS_COORDS_LIMIT.y.max - mapPinMain.offsetHeight - MAP_PIN_ARROW_HEIGHT
    }
  };

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

  var setAddressInputValue = function (obj) {
    obj.x = obj.x + Math.round(mapPinMain.offsetWidth / 2);
    obj.y = obj.y + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT;
    inputAddress.value = obj.x + ', ' + obj.y;
  };

  var isPageActive = false;
  var currentCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    var isMoved = false;
    activatePage(isPageActive);
    isPageActive = true;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapPinMainMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      isMoved = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      currentCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      currentCoords.x = (currentCoords.x < mapPinCoordsLimit.x.min) ? mapPinCoordsLimit.x.min : currentCoords.x;
      currentCoords.x = (currentCoords.x > mapPinCoordsLimit.x.max) ? mapPinCoordsLimit.x.max : currentCoords.x;

      currentCoords.y = (currentCoords.y < mapPinCoordsLimit.y.min) ? mapPinCoordsLimit.y.min : currentCoords.y;
      currentCoords.y = (currentCoords.y > mapPinCoordsLimit.y.max) ? mapPinCoordsLimit.y.max : currentCoords.y;

      mapPinMain.style.left = currentCoords.x + 'px';
      mapPinMain.style.top = currentCoords.y + 'px';

      setAddressInputValue(currentCoords);
    };

    var onMapPinMainMouseup = function (upEvt) {
      upEvt.preventDefault();

      if (!isMoved) {
        setAddressInputValue(currentCoords);
      }

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
      setAddressInputValue(currentCoords);
    }
  };

  var activatePage = function (isPageActivated) {
    if (!isPageActivated) {
      window.backend.load(window.data.loadData, window.data.onLoadError);
      window.data.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      changeElementStatus(fieldsetsAdForm, false);
      changeElementStatus(fieldsetsMapFilterForm, false);
      changeElementStatus(selectsMapFilterForm, false);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainKeydown);
})();
