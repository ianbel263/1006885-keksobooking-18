'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function (data) {
    closePopup();
    window.data.map.insertBefore(createCard(data), window.data.map.querySelector('.map__filters-container'));
    window.addEventListener('keydown', onEscPress);
  };

  var closePopup = function () {
    var checkNode = window.data.map.querySelector('.map__card');
    if (checkNode) {
      checkNode.remove();
      window.removeEventListener('keydown', onEscPress);
    }
  };

  var createCard = function (data) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresList = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    if (data.offer.type === 'palace') {
      var typeTranslated = 'Дворец';
    } else if (data.offer.type === 'flat') {
      typeTranslated = 'Квартира';
    } else if (data.offer.type === 'bungalo') {
      typeTranslated = 'Бунгало';
    } else if (data.offer.type === 'house') {
      typeTranslated = 'Дом';
    }

    cardElement.querySelector('.popup__type').textContent = typeTranslated;
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    featuresList.innerHTML = '';
    if (data.offer.features.length) {
      for (var i = 0; i < data.offer.features.length; i++) {
        var newItem = document.createElement('li');
        newItem.className = 'popup__feature popup__feature--' + data.offer.features[i];
        featuresList.appendChild(newItem);
      }
    } else {
        featuresList.classList.add('hidden');
      }

    cardElement.querySelector('.popup__photo').src = data.offer.photos[0];
    for (i = 1; i < data.offer.photos.length; i++) {
      var newImg = cardElement.querySelector('.popup__photo').cloneNode(true);
      newImg.src = data.offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(newImg);
    }

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closePopup();
    });

    return cardElement;
  };

  window.card = {
    createCard: createCard,
    openPopup: openPopup
  };
})();
