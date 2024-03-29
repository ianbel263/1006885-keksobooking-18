'use strict';

(function () {
  var mapPinsDiv = window.card.map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;

    pinElement.addEventListener('click', function () {
      window.card.openPopup(data);
    });

    return pinElement;
  };

  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (el) {
      if (el.offer) {
        fragment.appendChild(renderPin(el));
      }
      mapPinsDiv.appendChild(fragment);
    });
  };

  var deleteAllPins = function () {
    var allPins = mapPinsDiv.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (el) {
      el.remove();
    });
  };

  window.pin = {
    renderPins: renderPins,
    deleteAllPins: deleteAllPins
  };
})();
