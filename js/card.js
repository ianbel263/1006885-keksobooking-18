'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var map = document.querySelector('.map');

  var openPopup = function (data) {
    closePopup();
    map.insertBefore(createCard(data), map.querySelector('.map__filters-container'));
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    var checkNode = map.querySelector('.map__card');
    if (checkNode) {
      checkNode.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onEscPress = function (close, evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      close();
    }
  };

  var onPopupEscPress = onEscPress.bind(null, closePopup);

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
    if (data.offer.description !== '') {
      cardElement.querySelector('.popup__description').textContent = data.offer.description;
    } else {
      cardElement.querySelector('.popup__description').classList.add('hidden');
    }

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

    if (data.offer.photos.length) {
      cardElement.querySelector('.popup__photo').src = data.offer.photos[0];
      for (i = 1; i < data.offer.photos.length; i++) {
        var newImg = cardElement.querySelector('.popup__photo').cloneNode(true);
        newImg.src = data.offer.photos[i];
        cardElement.querySelector('.popup__photos').appendChild(newImg);
      }
    } else {
      cardElement.querySelector('.popup__photos').innerHTML = '';
      cardElement.querySelector('.popup__photos').classList.add('hidden');
    }

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closePopup();
    });

    return cardElement;
  };

  window.card = {
    map: map,
    createCard: createCard,
    openPopup: openPopup,
    closePopup: closePopup,
    onEscPress: onEscPress
  };
})();
