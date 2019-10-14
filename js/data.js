'use strict';

(function () {
  var fieldsetsAdForm = window.movePin.adForm.querySelectorAll('fieldset');

  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var selectsfilterForm = window.filter.filterForm.querySelectorAll('select');
  var fieldsetsfilterForm = window.filter.filterForm.querySelectorAll('fieldset');

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
    window.movePin.setDefaultMapPinMainCoords();
    window.card.closePopup();
    window.pin.deleteAllPins();
    window.filter.filterForm.reset();
    window.movePin.setAddressInputValue(window.movePin.startMapPinMainCoords, false);
    toggleDisableAttribute(fieldsetsfilterForm, true);
    toggleDisableAttribute(selectsfilterForm, true);
    toggleDisableAttribute(fieldsetsAdForm, true);
    window.card.map.classList.add('map--faded');
    window.movePin.adForm.classList.add('ad-form--disabled');
  };

  var activatePage = function (isPageActivated) {
    if (!isPageActivated) {
      window.backend.load(loadData, onError);
      window.card.map.classList.remove('map--faded');
      window.movePin.adForm.classList.remove('ad-form--disabled');

      toggleDisableAttribute(fieldsetsAdForm, false);
    }
  };

  deActivatePage();

  window.data = {
    main: main,
    errorTemplate: errorTemplate,
    activatePage: activatePage,
    deActivatePage: deActivatePage
  };
})();
