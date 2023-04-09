const editProfileButton = document.querySelector('.profile__edit');
const addPlaceButton = document.querySelector('.profile__add');

const buttonCloseList = document.querySelectorAll('.popup__icon');
const closePlaceButton = document.querySelector('.popup__icon_place');

const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_image');
const popupPic = document.querySelector('.popup__pic_image');
const popupCaption = document.querySelector('.popup__caption_image');

const formEditProfile = document.querySelector('.popup__form_profile');
const formPlaces = document.querySelector('.popup__form_places');

const profileNameInput = document.querySelector('.popup__input_profile_name');
const profileJobInput = document.querySelector('.popup__input_profile_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placeNameInput = document.querySelector('.popup__input_place_name');
const placeLinkInput = document.querySelector('.popup__input_place_link');

const placeTemplate = document.querySelector('.place__template').content;
const placesList = document.querySelector('.places__list_card');

function renderPlace(placeCard) {
  const placeElement = placeTemplate.cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image_card');
  placeElement.querySelector('.place__title_card').textContent = placeCard.name;
  placeImage.src = placeCard.link;
  placeImage.alt = placeCard.name;
  setEventListeners(placeElement);
  return placeElement;
}

initialCards.forEach((placeCard) => {
  const placeElement = renderPlace(placeCard);
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
  resetValidation(formEditProfile, settings);
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfile);
}

function openPlacePopup() {
  openPopup(popupPlace);
  resetValidation(formPlaces, settings);
}

function handlePlacesFormSubmit(event) {
  event.preventDefault();
  const item = { name: placeNameInput.value, link: placeLinkInput.value };
  const placeElement = renderPlace(item);
  placesList.prepend(placeElement);
  closePopup(popupPlace);
  resetFormSubmit();
}

function resetFormSubmit() {
  formPlaces.reset();
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
  popupPic.alt = card.alt;
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
formEditProfile.addEventListener('submit', submitEditProfileForm);
addPlaceButton.addEventListener('click', openPlacePopup);
closePlaceButton.addEventListener('click', resetFormSubmit);
formPlaces.addEventListener('submit', handlePlacesFormSubmit);
