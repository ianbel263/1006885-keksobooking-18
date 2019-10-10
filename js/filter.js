'use strict';

(function () {
  var ads = [];

  var filterForm = document.querySelector('.map__filters');
  var selectType = filterForm.querySelector('#housing-type');

  var getType = function (element) {
    return selectType.value === 'any' ? true : element.offer.type === selectType.value;
  };

  var filterData = function (data) {
    console.log("data", data);
    return data.filter(function (el) {
      return  getType(el);
    }).slice(0, 5);
  };

  filterForm.addEventListener('change', function () {
    window.card.closePopup();
    window.pin.deleteAllPins();
    window.pin.renderPins(window.filter.filterData(window.filter.ads));
  });

  window.filter = {
    ads: ads,
    filterForm: filterForm,
    filterData: filterData
  };
})();
