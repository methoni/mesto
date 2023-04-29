import { openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const placeTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return placeTemplate;
  }

  renderPlace() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__title_card').textContent = this._name;
    this._element.querySelector('.place__image_card').src = this._link;
    this._element.querySelector('.place__image_card').alt = this._name;
    return this._element;
  }

  _like = (event) => {
    event.target.classList.toggle('place__heart_black');
  };

  _removePlace = (event) => {
    const placeElement = event.target.closest('.place__element');
    placeElement.remove();
  };

  _openImage = () => {
    const popupPic = document.querySelector('.popup__pic_image');
    const popupCaption = document.querySelector('.popup__caption_image');
    const popupImage = document.querySelector('.popup_image');
    popupPic.src = this._link;
    popupPic.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupImage);
  };

  _setEventListeners() {
    this._element
      .querySelector('.place__heart_switch')
      .addEventListener('click', this._like);
    this._element
      .querySelector('.place__trash_button')
      .addEventListener('click', this._removePlace);
    this._element
      .querySelector('.place__image_card')
      .addEventListener('click', this._openImage);
  }
}
