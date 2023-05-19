import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  editProfileButton,
  addPlaceButton,
  initialCards,
  settings,
  formValidators,
} from '../utils/constants.js';

import '../pages/index.css';

// функционал валидации форм

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation(settings);

// функционал блока с карточками

// создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage('.popup-image');

popupImage.setEventListeners();

// функция создаёт карточку и возвращает её html представление
function createCard(item) {
  const card = new Card(item, '.place__template', popupImage.open);
  return card.renderPlace();
}

// функция добавляет в конкретную секцию новые карточки
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

// создание экземпляра класса Section с объектом начальных карточек
const section = new Section(
  { items: initialCards.reverse(), renderer: renderCard },
  '.places__list_card'
);

// добавление начальных карточек на страницу
section.renderItems();

// создание экземпляра класса PopupWithForm - форма добавления карточки
const popupPlace = new PopupWithForm('.popup-place', (cardData) => {
  renderCard(cardData);
});

popupPlace.setEventListeners();

// функция открытия формы добавления карточки
function openPlacePopup() {
  popupPlace.open();
  formValidators['places-form'].resetValidation();
}

// функционал блока с профилем

// создание экземпляра класса UserInfo для формы профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

// создание экземпляра класса PopupWithForm - форма профиля
const popupProfile = new PopupWithForm('.popup-profile', (profileData) => {
  userInfo.setUserInfo(profileData);
});

popupProfile.setEventListeners();

// функция открытия формы профиля
function openProfilePopup() {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
  formValidators['profile-form'].resetValidation();
}

// слушатели событий
editProfileButton.addEventListener('click', openProfilePopup);
addPlaceButton.addEventListener('click', openPlacePopup);
