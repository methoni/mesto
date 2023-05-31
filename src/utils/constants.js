const editProfileButton = document.querySelector('.profile__edit');
const addPlaceButton = document.querySelector('.profile__add');
const editAvatarButton = document.querySelector('.profile__avatar-edit');

// объект с данными для валидации
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', // Добавляет красное подчёркивание инпуту
  errorClass: 'popup__error_visible', // Делает спан видимым
};

// пустой объект для валидации
const formValidators = {};

export {
  editProfileButton,
  addPlaceButton,
  editAvatarButton,
  settings,
  formValidators,
};
