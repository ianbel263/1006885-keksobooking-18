'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('input[name=address]');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var selectsfilterForm = window.filter.filterForm.querySelectorAll('select');
  var fieldsetsfilterForm = window.filter.filterForm.querySelectorAll('fieldset');

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
    coordX = obj.x + mapPinMainHalfWidth;
    coordY = isActive ? obj.y + mapPinMain.offsetHeight + MAP_PIN_ARROW_HEIGHT : obj.y + Math.round(mapPinMain.offsetHeight / 2);
    inputAddress.value = coordX + ', ' + coordY;
  };

  var loadData = function (arr) {
    window.filter.ads = arr;
    window.pin.renderPins(window.filter.filterData(window.filter.ads));
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

  var deActivatePage = function () {
    mapPinMain.style.left = startMapPinMainCoords.x + 'px';
    mapPinMain.style.top = startMapPinMainCoords.y + 'px';
    window.card.closePopup();
    window.pin.deleteAllPins();
    window.filter.filterForm.reset();
    setAddressInputValue(startMapPinMainCoords, false);
    toggleDisableAttribute(fieldsetsfilterForm, true);
    toggleDisableAttribute(selectsfilterForm, true);
    toggleDisableAttribute(fieldsetsAdForm, true);
    window.card.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  };

  var activatePage = function (isPageActivated) {
    if (!isPageActivated) {
      window.backend.load(loadData, onError);
      window.card.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      toggleDisableAttribute(fieldsetsAdForm, false);
    }
  };

  deActivatePage();

  window.data = {
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
