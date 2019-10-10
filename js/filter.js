'use strict';

(function () {
  var ads = [];

  var filterForm = document.querySelector('.map__filters');
  var selectType = filterForm.querySelector('#housing-type');

  var deleteAllPins = function () {
    var allPins = window.card.map.querySelectorAll('.map__pin + :not(.map__pin--main)');
    allPins.forEach(function (el) {
      el.remove();
    });
  };

  var filterNumberAds = function (dataArr) {
    window.pin.renderPins(dataArr.slice(0, 5));
  };

  var filterTypeAds = function (dataArr, type) {
    filterNumberAds(dataArr.filter(function (el) {
      return el.offer.type === type;
    }));
  };

  filterForm.addEventListener('change', function() {
    window.card.closePopup();
    deleteAllPins();
    filterTypeAds(window.filter.ads, selectType.value);
  });

  window.filter = {
    ads: ads,
    filterForm: filterForm,
    deleteAllPins: deleteAllPins,
    filterNumberAds: filterNumberAds
  }
})();
