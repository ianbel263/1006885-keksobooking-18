'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainHalfWidth = Math.round(mapPinMain.offsetWidth / 2);

  var inputAddress = document.querySelector('input[name=address]');

  var MAP_PIN_ARROW_HEIGHT = 22;
  var ENTER_KEYCODE = 13;

  var CoordLimit = {
    LEFT: 0 - mapPinMainHalfWidth,
    TOP: 130 - mapPinMain.offsetHeight - MAP_PIN_ARROW_HEIGHT,
    RIGHT: window.card.map.offsetWidth - mapPinMainHalfWidth,
    BOTTOM: 630 - mapPinMain.offsetHeight - MAP_PIN_ARROW_HEIGHT
  };

  var isPageActive = false;
  var startMapPinMainCoords = new window.Coordinate(mapPinMain.offsetLeft, mapPinMain.offsetTop);
  var currentCoords = new window.Coordinate(mapPinMain.offsetLeft, mapPinMain.offsetTop, CoordLimit.LEFT, CoordLimit.TOP, CoordLimit.RIGHT, CoordLimit.BOTTOM);

  var setDefaultMapPinMainCoords = function () {
    mapPinMain.style.left = startMapPinMainCoords.x + 'px';
    mapPinMain.style.top = startMapPinMainCoords.y + 'px';
  };

  var setAddressInputValue = function (obj, isActive) {
    var coordX = obj.x + mapPinMainHalfWidth;
    var coordY = isActive ? obj.y + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT : obj.y + Math.round(mapPinMain.offsetHeight / 2);
    inputAddress.value = coordX + ', ' + coordY;
  };

  var onMapPinMainMousedown = function (evt) {
    evt.preventDefault();

    var isMoved = false;
    window.activatePage.doPageActive(window.movePin.isPageActive);

    var startCoords = new window.Coordinate(evt.clientX, evt.clientY, CoordLimit.LEFT, CoordLimit.TOP, CoordLimit.RIGHT, CoordLimit.BOTTOM);

    var onMapPinMainMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      isMoved = true;

      var shift = new window.Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      currentCoords.setX(mapPinMain.offsetLeft - shift.x);
      currentCoords.setY(mapPinMain.offsetTop - shift.y);

      mapPinMain.style.left = currentCoords.x + 'px';
      mapPinMain.style.top = currentCoords.y + 'px';

      setAddressInputValue(currentCoords, window.movePin.isPageActive);
    };

    var onMapPinMainMouseup = function (upEvt) {
      upEvt.preventDefault();

      if (!isMoved) {
        setAddressInputValue(startMapPinMainCoords, window.movePin.isPageActive);
      }

      document.removeEventListener('mousemove', onMapPinMainMousemove);
      document.removeEventListener('mouseup', onMapPinMainMouseup);

    };

    document.addEventListener('mousemove', onMapPinMainMousemove);
    document.addEventListener('mouseup', onMapPinMainMouseup);
  };

  var onMapPinMainKeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.activatePage.doPageActive(window.movePin.isPageActive);
      setAddressInputValue(startMapPinMainCoords, window.movePin.isPageActive);
    }
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMousedown);
  mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

  window.movePin = {
    startMapPinMainCoords: startMapPinMainCoords,
    setAddressInputValue: setAddressInputValue,
    isPageActive: isPageActive,
    setDefaultMapPinMainCoords: setDefaultMapPinMainCoords
  };
})();
