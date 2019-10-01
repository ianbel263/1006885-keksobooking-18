'use strict';

(function () {
  var renderCard = function (card) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
    var mapFiltersContainer = window.data.map.querySelector('.map__filters-container');

    var fragment = document.createDocumentFragment();
    var cardElement = cardTemplate.cloneNode(true);
    var featuresList = cardElement.querySelector('.popup__features');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    if (card.offer.type === 'palace') {
      var typeTranslated = 'Дворец';
    } else if (card.offer.type === 'flat') {
      typeTranslated = 'Квартира';
    } else if (card.offer.type === 'bungalo') {
      typeTranslated = 'Бунгало';
    } else if (card.offer.type === 'house') {
      typeTranslated = 'Дом';
    }

    cardElement.querySelector('.popup__type').textContent = typeTranslated;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    featuresList.innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      var newItem = document.createElement('li');
      newItem.className = 'popup__feature popup__feature--' + card.offer.features[i];
      featuresList.appendChild(newItem);
    }

    cardElement.querySelector('.popup__photo').src = card.offer.photos[0];
    for (i = 1; i < card.offer.photos.length; i++) {
      var newImg = cardElement.querySelector('.popup__photo').cloneNode(true);
      newImg.src = card.offer.photos[i];
      cardElement.querySelector('.popup__photos').appendChild(newImg);
    }

    // cardElement.classList.add('hidden');
    fragment.appendChild(cardElement);
    window.data.map.insertBefore(fragment, mapFiltersContainer);
  };

  window.card = {
    renderCard: renderCard
  };
})();
