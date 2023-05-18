export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation = () => {
    this._setFormEventListeners();
  };

  _setFormEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        if (this._hasInvalidInput(this._inputList)) {
          this._disableButton(this._submitButton);
        } else {
          this._enableButton(this._submitButton);
        }
      });
    });
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetValidation = () => {
    this._disableButton(this._submitButton);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _disableButton = (button) => {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute('disabled', '');
  };

  _enableButton = (button) => {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute('disabled');
  };
}
