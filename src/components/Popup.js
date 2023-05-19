export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__icon');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // метод закрытия модального окна по нажатию Escape
  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  // метод закрытия модального окна по нажатию на крестик
  _handleButtonClose = () => {
    this.close();
  };

  // метод закрытия модального окна по нажатию на пустую область
  _handleOverlayClose = (event) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this._handleButtonClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}
