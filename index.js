let editButton = document.querySelector(".profile__edit");
let popup = document.querySelector(".popup");
let cancelButton = document.querySelector(".popup__icon");

function visible() {
  popup.classList.add("popup_opened");
}

editButton.addEventListener("click", visible);

function invisible() {
  popup.classList.remove("popup_opened");
}

cancelButton.addEventListener("click", invisible);

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

formElement.addEventListener("submit", handleFormSubmit);
