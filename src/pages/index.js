import './index.css';

import {editProfileButton, addCardButton, nameInput, descriptionInput, editFormPopup, addFormPopup, cardsListSelector, initialCards, obj} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


// Создаем экземпляры класса FormValidator для форм
const editFormValidation = new FormValidator(obj, editFormPopup);
const addFormValidation = new FormValidator(obj, addFormPopup);

// Подключаем валидацию форм
editFormValidation.enableValidation();
addFormValidation.enableValidation();


const imagePopup = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileDescriptionSelector: '.profile__subtitle'
});


// Функция для создания экземпляра новой карточки
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: (item) => {
      imagePopup.open(item);
    }
  }, '.card-template');

  const cardElement = card.generateCard();

  return cardElement;
};

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);

    cardsList.addInitialItems(cardElement);
  }
}, cardsListSelector);

// Отрисовка исходных карточек
cardsList.renderItem();

// Создаем экземпляр класса для попапа редактирования информации о себе
const editPopup = new PopupWithForm({
  selectorPopup: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
});

// Создаем экземпляр класса для попапа добавления новой карточки
const addPopup = new PopupWithForm({
  selectorPopup: '.popup_type_add',
  handleFormSubmit: (formValues) => {
    cardsList.addItem(createCard(formValues));
  }
});

// Прикрепили обработчик к кнопке открытия попапа редактирования информации
editProfileButton.addEventListener('click', () => {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  descriptionInput.value = profile.description;

  editPopup.open();

  editFormValidation.resetValidation();
});

// Прикрепили обработчик к кнопке открытия попапа добавления карточек
addCardButton.addEventListener('click', () => {
  addPopup.open();

  addFormValidation.resetValidation();
});

// Добавляем слушатели для экземпляров попапов форм
imagePopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
