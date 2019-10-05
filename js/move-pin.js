'use strict';

(function () {
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
      min: ADDRESS_COORDS_LIMIT.x.min - window.data.mapPinMainHalfWidth,
      max: ADDRESS_COORDS_LIMIT.x.max - window.data.mapPinMainHalfWidth
    },
    y: {
      min: ADDRESS_COORDS_LIMIT.y.min - window.data.mapPinMain.offsetHeight - window.data.MAP_PIN_ARROW_HEIGHT,
      max: ADDRESS_COORDS_LIMIT.y.max - window.data.mapPinMain.offsetHeight - window.data.MAP_PIN_ARROW_HEIGHT
    }
  };

  var isPageActive = false;
  var currentCoords = window.data.currentMapPinMainCoords;

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    var isMoved = false;
    window.data.activatePage(isPageActive);
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
        x: window.data.mapPinMain.offsetLeft - shift.x,
        y: window.data.mapPinMain.offsetTop - shift.y
      };

      currentCoords.x = (currentCoords.x < mapPinCoordsLimit.x.min) ? mapPinCoordsLimit.x.min : currentCoords.x;
      currentCoords.x = (currentCoords.x > mapPinCoordsLimit.x.max) ? mapPinCoordsLimit.x.max : currentCoords.x;

      currentCoords.y = (currentCoords.y < mapPinCoordsLimit.y.min) ? mapPinCoordsLimit.y.min : currentCoords.y;
      currentCoords.y = (currentCoords.y > mapPinCoordsLimit.y.max) ? mapPinCoordsLimit.y.max : currentCoords.y;

      window.data.mapPinMain.style.left = currentCoords.x + 'px';
      window.data.mapPinMain.style.top = currentCoords.y + 'px';

      window.data.setAddressInputValue(currentCoords, isPageActive);
    };

    var onMapPinMainMouseup = function (upEvt) {
      upEvt.preventDefault();

      if (!isMoved) {
        window.data.setAddressInputValue(currentCoords, isPageActive);
      }

      document.removeEventListener('mousemove', onMapPinMainMousemove);
      document.removeEventListener('mouseup', onMapPinMainMouseup);

    };

    document.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.data.activatePage(isPageActive);
      isPageActive = true;
      window.data.setAddressInputValue(currentCoords, isPageActive);
    }
  };

  window.data.mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  window.data.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

})();
