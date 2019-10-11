'use strict';

(function () {
  var ads = [];

  var Price = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterForm = document.querySelector('.map__filters');
  var selectType = filterForm.querySelector('#housing-type');
  var selectPrice = filterForm.querySelector('#housing-price');
  var selectRooms = filterForm.querySelector('#housing-rooms');
  var selectGuests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelectorAll('input[type=checkbox]');

  var getType = function (element) {
    return selectType.value === 'any' ? true : element.offer.type === selectType.value;
  };

  var getPrice = function (element) {
    switch (selectPrice.value) {
      case Price.LOW:
        return element.offer.price < Price.MIN;
      case Price.MIDDLE:
        return element.offer.price >= Price.MIN && element.offer.price <= Price.MAX;
      case Price.HIGH:
        return element.offer.price > Price.MAX;
      default:
        return true;
    }
  };

  var getRooms = function (element) {
    return selectRooms.value === 'any' ? true : element.offer.rooms === parseInt(selectRooms.value, 10);
  };

  var getGuests = function (element) {
    return selectGuests.value === 'any' ? true : element.offer.guests === parseInt(selectGuests.value, 10);
  };

  var getFeatures = function (element) {
    return Array.from(features)
            .filter(function (el) {
              return el.checked;
            })
            .map(function (it) {
              return it.value;
            })
            .every(function (feature) {
              return element.offer.features.includes(feature);
            });
  };

  var filterData = function (data) {
    return data.filter(function (el) {
      return getType(el) &&
              getPrice(el) &&
              getRooms(el) &&
              getGuests(el) &&
              getFeatures(el);
    }).slice(0, 5);
  };

  var onFilterFormChange = window.debounce(function () {
    window.pin.renderPins(filterData(window.filter.ads));
  });

  filterForm.addEventListener('change', function () {
    window.card.closePopup();
    window.pin.deleteAllPins();
    onFilterFormChange();
  });

  window.filter = {
    ads: ads,
    filterForm: filterForm,
    filterData: filterData
  };
})();
