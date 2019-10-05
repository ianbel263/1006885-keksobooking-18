'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ADDRESS_COORDS_LIMIT = {
    x: {
      min: 0,
      max: window.actPage.map.offsetWidth
    },
    y: {
      min: 130,
      max: 630
    }
  };

  var mapPinCoordsLimit = {
    x: {
      min: ADDRESS_COORDS_LIMIT.x.min - window.form.mapPinMainHalfWidth,
      max: ADDRESS_COORDS_LIMIT.x.max - window.form.mapPinMainHalfWidth
    },
    y: {
      min: ADDRESS_COORDS_LIMIT.y.min - window.form.mapPinMain.offsetHeight - window.form.MAP_PIN_ARROW_HEIGHT,
      max: ADDRESS_COORDS_LIMIT.y.max - window.form.mapPinMain.offsetHeight - window.form.MAP_PIN_ARROW_HEIGHT
    }
  };

  var isPageActive = false;
  var currentCoords = {
    x: window.form.mapPinMain.offsetLeft,
    y: window.form.mapPinMain.offsetTop
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    var isMoved = false;
    window.actPage.activatePage(isPageActive);
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
        x: window.form.mapPinMain.offsetLeft - shift.x,
        y: window.form.mapPinMain.offsetTop - shift.y
      };

      currentCoords.x = (currentCoords.x < mapPinCoordsLimit.x.min) ? mapPinCoordsLimit.x.min : currentCoords.x;
      currentCoords.x = (currentCoords.x > mapPinCoordsLimit.x.max) ? mapPinCoordsLimit.x.max : currentCoords.x;

      currentCoords.y = (currentCoords.y < mapPinCoordsLimit.y.min) ? mapPinCoordsLimit.y.min : currentCoords.y;
      currentCoords.y = (currentCoords.y > mapPinCoordsLimit.y.max) ? mapPinCoordsLimit.y.max : currentCoords.y;

      window.form.mapPinMain.style.left = currentCoords.x + 'px';
      window.form.mapPinMain.style.top = currentCoords.y + 'px';

      window.form.setAddressInputValue(currentCoords);
    };

    var onMapPinMainMouseup = function (upEvt) {
      upEvt.preventDefault();

      if (!isMoved) {
        window.form.setAddressInputValue(currentCoords);
      }

      document.removeEventListener('mousemove', onMapPinMainMousemove);
      document.removeEventListener('mouseup', onMapPinMainMouseup);

    };

    document.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.actPage.activatePage(isPageActive);
      isPageActive = true;
      window.form.setAddressInputValue(currentCoords);
    }
  };

  window.form.mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  window.form.mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

})();
