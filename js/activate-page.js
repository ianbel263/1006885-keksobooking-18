'use strict';

(function () {
  var fieldsetsAdForm = window.movePin.adForm.querySelectorAll('fieldset');

  var toggleDisableAttribute = function (elements, isTrue) {
    elements.forEach(function (el) {
      el.disabled = isTrue;
    });
  };

  var doPageNonActive = function () {
    window.movePin.isPageActive = false;
    window.movePin.setDefaultMapPinMainCoords();
    window.card.closePopup();
    window.pin.deleteAllPins();
    window.filter.filterForm.reset();
    window.movePin.setAddressInputValue(window.movePin.startMapPinMainCoords, window.movePin.isPageActivated);
    console.log("window.movePin.startMapPinMainCoords", window.movePin.startMapPinMainCoords);
    toggleDisableAttribute(window.data.fieldsetsFilterForm, true);
    toggleDisableAttribute(window.data.selectsFilterForm, true);
    toggleDisableAttribute(fieldsetsAdForm, true);
    window.card.map.classList.add('map--faded');
    window.movePin.adForm.classList.add('ad-form--disabled');
  };

  var doPageActive = function (isPageActivated) {
    if (!isPageActivated) {
      window.backend.load(window.data.loadData, window.data.onError);
      window.card.map.classList.remove('map--faded');
      window.movePin.adForm.classList.remove('ad-form--disabled');

      toggleDisableAttribute(fieldsetsAdForm, false);
    }
  };

  doPageNonActive();

  window.activatePage = {
    doPageActive: doPageActive,
    doPageNonActive: doPageNonActive,
    toggleDisableAttribute: toggleDisableAttribute
  };
})();
