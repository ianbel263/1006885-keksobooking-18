'use strict';

(function () {
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
    toggleDisableAttribute(window.data.fieldsetsFilterForm, true);
    toggleDisableAttribute(window.data.selectsFilterForm, true);
    toggleDisableAttribute(window.data.fieldsetsAdForm, true);
    window.movePin.setAddressInputValue(window.movePin.startMapPinMainCoords, false);
    window.card.map.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
  };

  var doPageActive = function (isPageActivated) {
    if (!isPageActivated) {
      window.movePin.isPageActive = true;
      window.backend.load(window.data.loadData, window.data.onError);
    }
  };

  doPageNonActive();

  window.activatePage = {
    doPageActive: doPageActive,
    doPageNonActive: doPageNonActive,
    toggleDisableAttribute: toggleDisableAttribute
  };
})();
