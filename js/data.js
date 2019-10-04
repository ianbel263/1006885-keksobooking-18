'use strict';

(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var loadData = function (arr) {
    window.pin.renderPins(arr);
  };

  var onLoadError = function (errMessage) {
    var errorBlock = errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = errMessage;
    main.appendChild(errorBlock);
  };

  window.data = {
    map: map,
    loadData: loadData,
    onLoadError: onLoadError
    // ADDRESS_COORDS_LIMIT: ADDRESS_COORDS_LIMIT
  };
})();
