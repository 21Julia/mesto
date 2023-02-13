let profile = document.querySelector('.profile');
let editButtonProfile = profile.querySelector('.profile__edit-button');
let nameProfile = profile.querySelector('.profile__title');
let descriptionProfile = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let formPopup = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input-name');
let descriptionInput = popup.querySelector('.popup__input-description');

editButtonProfile.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

function closeForm() {
  popup.classList.remove('popup_opened');
};

closeButton.addEventListener('click', closeForm);

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closeForm();
};

formPopup.addEventListener('submit', handleFormSubmit);
