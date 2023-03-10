let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let cancelButton = document.querySelector('.popup__icon');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__profile_info_name');
let jobInput = document.querySelector('.popup__profile_info_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function visible() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function invisible() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  invisible();
}

editButton.addEventListener('click', visible);
cancelButton.addEventListener('click', invisible);
formElement.addEventListener('submit', handleFormSubmit);
