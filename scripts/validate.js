const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', // Добавляет красное подчёркивание инпуту
  errorClass: 'popup__error_visible', // Делает спан видимым
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setFormEventListeners(formElement, rest);
  });
};

const setFormEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const formButton = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, rest);
      if (hasInvalidInput(inputList)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};

// Проверяет валидность инпута и показывает ошибки
const isValid = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass, ...rest }
) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, {
      inputErrorClass,
      errorClass,
    });
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
  }
};

// Определяет, есть ли невалидные инпуты в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Сбрасывает ошибки
function resetValidation(
  formElement,
  { inputSelector, submitButtonSelector, inputErrorClass, errorClass, ...rest }
) {
  const formButton = formElement.querySelector(submitButtonSelector);
  formElement.querySelectorAll(inputSelector).forEach((inputElement) => {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass });
    disableButton(formButton, rest);
  });
}

// Включает спан с ошибкой и красное подчёркивание
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Выключает спан с ошибкой и красное подчёркивание
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const disableButton = (button, { inactiveButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', '');
};

const enableButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute('disabled');
};

enableValidation(settings);
