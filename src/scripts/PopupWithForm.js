import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._submitter = submitter;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(
      this._formElement.querySelectorAll('.popup__input')
    );
  }

  // метод собирает данные всех полей формы в объект
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });
    return inputValues;
  }

  // метод присваивает полям формы данные
  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
      inputElement.value = data[inputElement.name];
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitter(this._getInputValues());
      this.close();
    });
  }
}
