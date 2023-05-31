import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._submitter = submitter;
    this._formElement = this._popup.querySelector('.popup__form');
  }

  open = (item) => {
    super.open();
    this._item = item;
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitter(this._item, this._item._cardId);
    });
  }
}
