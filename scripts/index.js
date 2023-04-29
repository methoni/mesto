import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const editProfileButton = document.querySelector('.profile__edit');
const addPlaceButton = document.querySelector('.profile__add');

const buttonCloseList = document.querySelectorAll('.popup__icon');

const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');

const formEditProfile = document.querySelector('.popup__form_profile');
const formPlaces = document.querySelector('.popup__form_places');

const profileNameInput = document.querySelector('.popup__input_profile_name');
const profileJobInput = document.querySelector('.popup__input_profile_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placeNameInput = document.querySelector('.popup__input_place_name');
const placeLinkInput = document.querySelector('.popup__input_place_link');

const placesList = document.querySelector('.places__list_card');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error', // Добавляет красное подчёркивание инпуту
  errorClass: 'popup__error_visible', // Делает спан видимым
};

const profileValidator = new FormValidator(settings, popupProfile);
profileValidator.enableValidation();

const placeValidator = new FormValidator(settings, popupPlace);
placeValidator.enableValidation();

initialCards.forEach((item) => {
  const card = new Card(item, '.place__template');
  const placeElement = card.renderPlace();
  placesList.append(placeElement);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

buttonCloseList.forEach((btn) => {
  const popup = btn.closest('.popup');
  popup.addEventListener('mousedown', closeByOverlay);
  btn.addEventListener('click', () => closePopup(popup));
});

function closeByOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}

function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  profileValidator.resetValidation();
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfile);
}

function openPlacePopup() {
  resetFormSubmit();
  openPopup(popupPlace);
  placeValidator.resetValidation();
}

function handlePlacesFormSubmit(event) {
  event.preventDefault();
  const item = { name: placeNameInput.value, link: placeLinkInput.value };
  const card = new Card(item, '.place__template');
  const placeElement = card.renderPlace();
  placesList.prepend(placeElement);
  closePopup(popupPlace);
}

function resetFormSubmit() {
  formPlaces.reset();
}

editProfileButton.addEventListener('click', openProfilePopup);
formEditProfile.addEventListener('submit', submitEditProfileForm);
addPlaceButton.addEventListener('click', openPlacePopup);
formPlaces.addEventListener('submit', handlePlacesFormSubmit);

export { openPopup };
