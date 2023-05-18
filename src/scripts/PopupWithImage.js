import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup-image__pic');
    this._popupCaption = this._popup.querySelector('.popup-image__caption');
  }

  open = (name, link) => {
    console.log(name);
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  };
}
