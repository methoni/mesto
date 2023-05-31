import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitter) {
    super(popupSelector);
    this._submitter = submitter;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(
      this._formElement.querySelectorAll('.popup__input')
    );
    this._submitButton = this._popup.querySelector('.popup__button');
    this._standardText = this._submitButton.textContent;
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

  // метод присваивает кнопке новый текст на время загрузки данных
  _handleAwait() {
    this._submitButton.textContent = 'Сохранение...';
  }

  // метод возвращает кнопке стандартный текст
  resetButton() {
    this._submitButton.textContent = this._standardText;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleAwait();
      this._submitter(this._getInputValues());
    });
  }
}
