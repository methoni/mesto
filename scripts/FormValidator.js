export class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
  }

  enableValidation = () => {
    this._setFormEventListeners();
  };

  _setFormEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        if (this._hasInvalidInput(inputList)) {
          this._disableButton(formButton);
        } else {
          this._enableButton(formButton);
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
    const formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._disableButton(formButton);
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputList.forEach((inputElement) => {
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
