'use strict';

(function () {
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var selectRoomNumber = window.data.adForm.querySelector('#room_number');
  var selectCapacity = window.data.adForm.querySelector('#capacity');
  var selectType = window.data.adForm.querySelector('#type');
  var inputPrice = window.data.adForm.querySelector('#price');
  var selectTimeIn = window.data.adForm.querySelector('#timein');
  var selectTimeOut = window.data.adForm.querySelector('#timeout');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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
    time2.value = time1.value;
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
    window.data.adForm.reset();
    window.activatePage.doPageNonActive();
    openSuccess();
  };

  var onSaveErrorButtonClick = function () {
    var checkNode = window.data.main.querySelector('.error');
    if (checkNode) {
      checkNode.remove();
      document.removeEventListener('click', onSaveErrorButtonClick);
      document.removeEventListener('keydown', onSaveErrorEscPress);
    }
  };

  var onSaveErrorEscPress = window.card.onEscPress.bind(null, onSaveErrorButtonClick);

  var onSaveError = function (errMessage) {
    window.data.createErrorBlock(errMessage, onSaveErrorButtonClick);
    document.addEventListener('click', onSaveErrorButtonClick);
    document.addEventListener('keydown', onSaveErrorEscPress);
  };

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

  window.data.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.data.adForm), onSaveSuccess, onSaveError);
  });

  window.data.adForm.addEventListener('reset', function () {
    window.upload.avatarPreview.src = DEFAULT_AVATAR_SRC;
    var allUploadedPhotos = window.upload.photoContainer.querySelectorAll('.ad-form__photo');
    allUploadedPhotos[0].innerHTML = '';
    Array.from(allUploadedPhotos).slice(1).forEach(function (el) {
      el.remove();
    });
    window.activatePage.doPageNonActive();
  });
})();
