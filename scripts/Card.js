export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const placeTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return placeTemplate;
  }

  renderPlace() {
    this._element = this._getTemplate();
    this._element.querySelector('.place__title_card').textContent = this._name;
    this._cardImage = this._element.querySelector('.place__image_card');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  _toggleLike = (event) => {
    event.target.classList.toggle('place__heart_black');
  };

  _removePlace = (event) => {
    const placeElement = event.target.closest('.place__element');
    placeElement.remove();
  };

  _setEventListeners() {
    this._element
      .querySelector('.place__heart_switch')
      .addEventListener('click', this._toggleLike);
    this._element
      .querySelector('.place__trash_button')
      .addEventListener('click', this._removePlace);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
