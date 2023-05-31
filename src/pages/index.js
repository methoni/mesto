import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  editProfileButton,
  addPlaceButton,
  editAvatarButton,
  settings,
  formValidators,
} from '../utils/constants.js';

import '../pages/index.css';

let userId = null;

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

// функционал для связи с сервером

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'b76f62bc-fc94-47a0-8fcd-24ebc70a3fc1',
    'Content-Type': 'application/json',
  },
});

// функционал блока с карточками

// создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage('.popup-image');

popupImage.setEventListeners();

// создание экземпляра класса PopupWithConfirmation
const popupDelete = new PopupWithConfirmation(
  '.popup-confirm',
  (item, cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        item.removePlace(res);
        popupDelete.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupDelete.setEventListeners();

// функция создаёт карточку и возвращает её html представление
function createCard(item) {
  const card = new Card(
    item,
    userId,
    '.place__template',
    popupImage.open,
    popupDelete.open,
    (cardId) => {
      if (card.isLiked()) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.renderPlace();
}

// функция добавляет в конкретную секцию новые карточки
function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

// создание экземпляра класса Section с объектом начальных карточек
const section = new Section({ renderer: renderCard }, '.places__list_card');

// создание экземпляра класса PopupWithForm - форма добавления карточки
const popupPlace = new PopupWithForm('.popup-place', (cardData) => {
  api
    .addNewCard(cardData)
    .then((res) => {
      renderCard(res);
      popupPlace.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupPlace.resetButton();
    });
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
  aboutSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
});

// создание экземпляра класса PopupWithForm - форма профиля
const popupProfile = new PopupWithForm('.popup-profile', (profileData) => {
  api
    .editUserInfo(profileData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.resetButton();
    });
});

popupProfile.setEventListeners();

// функция открытия формы профиля
function openProfilePopup() {
  popupProfile.setInputValues(userInfo.getUserInfo());
  popupProfile.open();
  formValidators['profile-form'].resetValidation();
}

// создание экземпляра класса PopupWithForm - форма для редактирования аватара
const popupAvatar = new PopupWithForm('.popup-avatar', (avatarData) => {
  api
    .editAvatar(avatarData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.resetButton();
    });
});

popupAvatar.setEventListeners();

// функция открытия формы редактирования аватара
function openAvatarPopup() {
  popupAvatar.open();
  formValidators['avatar-form'].resetValidation();
}

// общий функционал

// добавление на страницу начальных карточек и информации пользователя
api
  .getAllNeededData()
  .then(([cardsData, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    section.renderItems(cardsData.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

// слушатели событий
editProfileButton.addEventListener('click', openProfilePopup);
addPlaceButton.addEventListener('click', openPlacePopup);
editAvatarButton.addEventListener('click', openAvatarPopup);
