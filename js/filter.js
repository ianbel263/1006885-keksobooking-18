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

  var roomsGuestsToValue = {
    '1': 1,
    '2': 2,
    '3': 3,
    '0': 0
  };

  var filterForm = document.querySelector('.map__filters');
  var selectType = filterForm.querySelector('#housing-type');
  var selectPrice = filterForm.querySelector('#housing-price');
  var selectRooms = filterForm.querySelector('#housing-rooms');
  var selectGuests = filterForm.querySelector('#housing-guests');
  var wifi = filterForm.querySelector('#filter-wifi');
  var dishwasher = filterForm.querySelector('#filter-dishwasher');
  var parking = filterForm.querySelector('#filter-parking');
  var washer = filterForm.querySelector('#filter-washer');
  var elevator = filterForm.querySelector('#filter-elevator');
  var conditioner = filterForm.querySelector('#filter-conditioner');

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
    return selectRooms.value === 'any' ? true : element.offer.rooms === roomsGuestsToValue[selectRooms.value];
  };

  var getGuests = function (element) {
    return selectGuests.value === 'any' ? true : element.offer.guests === roomsGuestsToValue[selectGuests.value];
  };

  var checkCheckbox = function (element, checkbox) {
    if (checkbox.checked) {
      return element.offer.features.includes(checkbox.value);
    } else {
      return true;
    }
  };

  var getFeatures = function (element) {
    return checkCheckbox(element, wifi) &&
            checkCheckbox(element, dishwasher) &&
            checkCheckbox(element, parking) &&
            checkCheckbox(element, washer) &&
            checkCheckbox(element, elevator) &&
            checkCheckbox(element, conditioner);
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
