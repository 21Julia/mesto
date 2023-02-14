let profile = document.querySelector('.profile');
let editButtonProfile = profile.querySelector('.profile__edit-button');
let nameProfile = profile.querySelector('.profile__title');
let descriptionProfile = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let formPopup = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let nameInput = popup.querySelector('.popup__input_type_name');
let descriptionInput = popup.querySelector('.popup__input_type_description');


// Функция для открытия попапа
function classAdded() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

// Функция для закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
};

// Функция для редактирования имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup();
};


// Прикрепили обработчик к кнопке редактирования информации
editButtonProfile.addEventListener('click', classAdded);

// Прикрепили обработчик к кнопке закрытия попапа
closeButton.addEventListener('click', closePopup);

// Прикрепили обработчик к форме для сохранения информации о пользователе
formPopup.addEventListener('submit', handleFormSubmit);
