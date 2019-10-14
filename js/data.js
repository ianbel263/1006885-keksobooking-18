'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var fieldsetsFilterForm = window.filter.filterForm.querySelectorAll('fieldset');
  var selectsFilterForm = window.filter.filterForm.querySelectorAll('select');

  var loadData = function (arr) {
    window.filter.ads = arr;
    window.pin.renderPins(window.filter.filterData(arr));
    window.activatePage.toggleDisableAttribute(fieldsetsFilterForm, false);
    window.activatePage.toggleDisableAttribute(selectsFilterForm, false);
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

  window.data = {
    main: main,
    loadData: loadData,
    onError: onError,
    errorTemplate: errorTemplate,
    fieldsetsFilterForm: fieldsetsFilterForm,
    selectsFilterForm: selectsFilterForm
  };
})();
