'use strict';

(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var filterForm = document.querySelector('.map__filters');
  var selectsfilterForm = filterForm.querySelectorAll('select');
  var fieldsetsfilterForm = filterForm.querySelectorAll('fieldset');

  var adForm = document.querySelector('.ad-form');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');

  var loadData = function (arr) {
    window.pin.renderPins(arr);
    toggleDisableAttribute(fieldsetsfilterForm, false);
    toggleDisableAttribute(selectsfilterForm, false);
  };

  var onLoadError = function (errMessage) {
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = errMessage;
    errorBlock.querySelector('.error__button').addEventListener('click', function () {
      window.backend.load(loadData, onLoadError);
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

  toggleDisableAttribute(fieldsetsfilterForm, true);
  toggleDisableAttribute(selectsfilterForm, true);
  toggleDisableAttribute(fieldsetsAdForm, true);

  var activatePage = function (isPageActivated) {
    if (!isPageActivated) {
      window.backend.load(loadData, onLoadError);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      toggleDisableAttribute(fieldsetsAdForm, false);
    }
  };

  window.actPage = {
    map: map,
    adForm: adForm,
    activatePage: activatePage
  };
})();
