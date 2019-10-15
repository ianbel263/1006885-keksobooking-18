'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var adForm = document.querySelector('.ad-form');
  var fieldsetsFilterForm = window.filter.filterForm.querySelectorAll('fieldset');
  var selectsFilterForm = window.filter.filterForm.querySelectorAll('select');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');


  var loadData = function (arr) {
    window.filter.ads = arr;
    window.pin.renderPins(window.filter.filterData(arr));
    window.activatePage.toggleDisableAttribute(fieldsetsFilterForm, false);
    window.activatePage.toggleDisableAttribute(selectsFilterForm, false);
    window.activatePage.toggleDisableAttribute(fieldsetsAdForm, false);
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var onErrorButtonClick = function (evt) {
    window.backend.load(loadData, onError);
    evt.target.parentNode.remove();
  };

  var createErrorBlock = function (errMessage, cb) {
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = errMessage;
    errorBlock.querySelector('.error__button').addEventListener('click', cb);
    main.appendChild(errorBlock);
  };

  var onError = function (errMessage) {
    createErrorBlock(errMessage, onErrorButtonClick);
  };

  window.data = {
    main: main,
    adForm: adForm,
    loadData: loadData,
    onError: onError,
    createErrorBlock: createErrorBlock,
    fieldsetsFilterForm: fieldsetsFilterForm,
    selectsFilterForm: selectsFilterForm,
    fieldsetsAdForm: fieldsetsAdForm
  };
})();
