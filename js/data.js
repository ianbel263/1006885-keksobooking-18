'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('input[name=address]');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var filterForm = document.querySelector('.map__filters');
  var selectsfilterForm = filterForm.querySelectorAll('select');
  var fieldsetsfilterForm = filterForm.querySelectorAll('fieldset');

  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainHalfWidth = Math.round(mapPinMain.offsetWidth / 2);
  var MAP_PIN_ARROW_HEIGHT = 22;

  var startMapPinMainCoords = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop
  };

  var isPageActive = false;

  var setAddressInputValue = function (obj, isActive) {
    var coordX;
    var coordY;
    if (isActive) {
      coordY = obj.y + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT;
    } else {
      coordY = obj.y + Math.round(mapPinMain.offsetHeight / 2);
    }
    coordX = obj.x + mapPinMainHalfWidth;
    inputAddress.value = coordX + ', ' + coordY;
  };

  var loadData = function (arr) {
    window.pin.renderPins(arr);
    toggleDisableAttribute(fieldsetsfilterForm, false);
    toggleDisableAttribute(selectsfilterForm, false);
  };

  var onError = function (errMessage) {
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = errMessage;
    errorBlock.querySelector('.error__button').addEventListener('click', function () {
      window.backend.load(loadData, onError);
      if (errorBlock) {
        errorBlock.remove();
      }
    });
    main.appendChild(errorBlock);
  };

  var toggleDisableAttribute = function (elements, isTrue) {
    elements.forEach(function (el) {
      el.disabled = isTrue;
    });
  };

  // потом объединить в одну функцию toggleActivePage
  var deActivatePage = function () {
    setAddressInputValue(startMapPinMainCoords, false);
    toggleDisableAttribute(fieldsetsfilterForm, true);
    toggleDisableAttribute(selectsfilterForm, true);
    toggleDisableAttribute(fieldsetsAdForm, true);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var activatePage = function (isPageActivated) {
    if (!isPageActivated) {
      window.backend.load(loadData, onError);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      toggleDisableAttribute(fieldsetsAdForm, false);
    }
  };

  deActivatePage();

  window.data = {
    map: map,
    main: main,
    mapPinMain: mapPinMain,
    mapPinMainHalfWidth: mapPinMainHalfWidth,
    MAP_PIN_ARROW_HEIGHT: MAP_PIN_ARROW_HEIGHT,
    startMapPinMainCoords: startMapPinMainCoords,
    setAddressInputValue: setAddressInputValue,
    adForm: adForm,
    errorTemplate: errorTemplate,
    activatePage: activatePage,
    deActivatePage: deActivatePage,
    isPageActive: isPageActive
  };
})();
