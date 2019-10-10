'use strict';

(function () {

  var adForm = window.data.adForm;
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');
  var selectType = adForm.querySelector('#type');
  var inputPrice = adForm.querySelector('#price');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var timeToTime = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var checkCapacityValidity = function () {
    var roomValue = parseInt(selectRoomNumber.value, 10);
    var capacityValue = parseInt(selectCapacity.value, 10);
    if (roomValue < capacityValue) {
      if (roomValue !== 100 || capacityValue !== 0) {
        selectCapacity.setCustomValidity('Количество гостей не должно быть больше количества комнат');
      }
    } else if (roomValue === 100 && capacityValue !== 0) {
      selectCapacity.setCustomValidity('Для 100 комнат выберите значение "не для гостей"');
    } else if (roomValue !== 100 && capacityValue === 0) {
      selectCapacity.setCustomValidity('Если выбираете "не для гостей", укажите количество комнат, равное 100');
    } else if (roomValue === 100 && capacityValue === 0) {
      selectCapacity.setCustomValidity('');
    } else {
      selectCapacity.setCustomValidity('');
    }
  };

  var checkPriceValidity = function () {
    inputPrice.min = typeToPrice[selectType.value];
    inputPrice.placeholder = typeToPrice[selectType.value];
  };

  var checkTimeValidity = function (time1, time2) {
    time2.value = timeToTime[time1.value];
  };

  var openSuccess = function () {
    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
    window.data.main.appendChild(successTemplate);
  };

  var closeSuccess = function () {
    if (successTemplate) {
      successTemplate.remove();
      document.removeEventListener('click', onSuccessClick);
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var onSuccessEscPress = window.card.onEscPress.bind(null, closeSuccess);

  var onSaveSuccess = function () {
    adForm.reset();
    window.data.deActivatePage();
    window.data.isPageActive = false;

    openSuccess();
  };

  var onSaveError = function (errMessage) {
    var errorBlock = window.data.errorTemplate.cloneNode(true);
    errorBlock.querySelector('.error__message').textContent = errMessage;
    errorBlock.querySelector('.error__button').addEventListener('click', function () {
      closeSaveError();
    });
    document.addEventListener('click', onSaveErrorClick);
    document.addEventListener('keydown', onSaveErrorEscPress);
    window.data.main.appendChild(errorBlock);
  };

  var closeSaveError = function () {
    var checkNode = window.data.main.querySelector('.error');
    if (checkNode) {
      checkNode.remove();
    }
    document.removeEventListener('click', onSaveErrorClick);
    document.removeEventListener('keydown', onSaveErrorEscPress);
  };

  var onSaveErrorClick = function () {
    closeSaveError();
  };

  var onSaveErrorEscPress = window.card.onEscPress.bind(null, closeSaveError);

  checkCapacityValidity();
  selectCapacity.addEventListener('change', function () {
    checkCapacityValidity();
  });
  selectRoomNumber.addEventListener('change', function () {
    checkCapacityValidity();
  });

  checkPriceValidity();
  selectType.addEventListener('change', function () {
    checkPriceValidity();
  });
  checkTimeValidity(selectTimeIn, selectTimeOut);

  selectTimeIn.addEventListener('change', function () {
    checkTimeValidity(selectTimeIn, selectTimeOut);
  });
  selectTimeOut.addEventListener('change', function () {
    checkTimeValidity(selectTimeOut, selectTimeIn);
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSaveSuccess, onSaveError);
  });

  adForm.addEventListener('reset', function () {
    window.data.deActivatePage();
    window.data.isPageActive = false;
  });
})();
