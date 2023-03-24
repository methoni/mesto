const editProfileButton = document.querySelector('.profile__edit');
const addPlaceButton = document.querySelector('.profile__add');

const closeProfileButton = document.querySelector('.popup__icon_profile');
const closePlaceButton = document.querySelector('.popup__icon_place');
const closeImageButton = document.querySelector('.popup__icon_image');

const popupProfile = document.querySelector('.popup__profile');
const popupPlace = document.querySelector('.popup__place');
const popupImage = document.querySelector('.popup__image');
const popupPic = document.querySelector('.popup__pic_image');
const popupCaption = document.querySelector('.popup__caption_image');

const formElement = document.querySelector('.popup__form_profile');
const formPlaces = document.querySelector('.popup__form_places');

const profileNameInput = document.querySelector('.popup__input_profile_name');
const profileJobInput = document.querySelector('.popup__input_profile_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placeNameInput = document.querySelector('.popup__input_place_name');
const placeLinkInput = document.querySelector('.popup__input_place_link');

const placeTemplate = document.querySelector('.place__template').content;
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

function renderPlace(placeCard) {
  const placeElement = placeTemplate.cloneNode(true);
  placeElement.querySelector('.place__title_card').textContent = placeCard.name;
  placeElement.querySelector('.place__image_card').src = placeCard.link;
  placeElement.querySelector('.place__image_card').alt = placeCard.name;
  setEventListeners(placeElement);
  return placeElement;
}

initialCards.forEach((placeCard) => {
  const placeElement = renderPlace(placeCard);
  placesList.append(placeElement);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(event) {
  const popup = event.target.closest('.popup__window');
  popup.classList.remove('popup_opened');
}

function openProfilePopup() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(event);
}

function openPlacePopup() {
  openPopup(popupPlace);
}

function handlePlacesFormSubmit(event) {
  event.preventDefault();
  const item = { name: placeNameInput.value, link: placeLinkInput.value };
  const placeElement = renderPlace(item);
  placesList.prepend(placeElement);
  placeNameInput.value = '';
  placeLinkInput.value = '';
  closePopup(event);
}

function like(event) {
  event.target.classList.toggle('place__heart_black');
}

function removePlace(event) {
  const placeElement = event.target.closest('.place__element');
  placeElement.remove();
}

function openImage(event) {
  const card = event.target.closest('.place__image_card');
  popupPic.src = card.src;
  popupCaption.textContent = card.alt;
  openPopup(popupImage);
}

function setEventListeners(placeElement) {
  placeElement
    .querySelector('.place__heart_switch')
    .addEventListener('click', like);
  placeElement
    .querySelector('.place__trash_button')
    .addEventListener('click', removePlace);
  placeElement
    .querySelector('.place__image_card')
    .addEventListener('click', openImage);
}

editProfileButton.addEventListener('click', openProfilePopup);
closeProfileButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
addPlaceButton.addEventListener('click', openPlacePopup);
closePlaceButton.addEventListener('click', closePopup);
formPlaces.addEventListener('submit', handlePlacesFormSubmit);
closeImageButton.addEventListener('click', closePopup);
