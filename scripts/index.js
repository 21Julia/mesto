import {popups, nameProfile, descriptionProfile, nameInput, descriptionInput, editPopup, titleInput, linkInput, cardsList, initialCards, editProfileButton, editFormPopup, addCardButton, addPopup, addFormPopup, addButtonSubmit, obj} from '../utils/constants.js';

import Card from './Card.js';

import FormValidator from './FormValidator.js';

// Функция, закрывающая модальное окно по нажатию на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// Функция для открытия попапа и прикрепления слушателя событий для закрытия попапа нажатием на клавишу Esc
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция для закрытия попапа и удаления слушателя событий для закрытия попапа нажатием на клавишу Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция прикрепления слушателя событий для закрытия попапов кликом на крестик или тёмный фон
const closePopups = () => {
  popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_opened')) {
              closePopup(popup);
          };

          if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
          };
      });
  });
};

// Функция для редактирования имени и информации о себе
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
};

// Функция для создания новой карточки
const renderCard = (item, cardsContainer) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
};

// Функция для добавления новой карточки от пользователя
function handleAddFormSubmit(evt) {
  const titleInputValue = titleInput.value;
  const linkInputValue = linkInput.value;

  evt.preventDefault();

  const card = {
    name: titleInputValue,
    link: linkInputValue,
    alt: titleInputValue
  };

  renderCard(card, cardsList);

  closePopup(addPopup);
};

// Цикл для создания экземпляра карточки, подготовки её к публикации и добавления в DOM
initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');

  const cardElement = card.generateCard();

  cardsList.append(cardElement);
})

// Прикрепили обработчик к кнопке открытия попапа редактирования информации
editProfileButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
});

// Прикрепили обработчик к форме для сохранения информации о пользователе
editFormPopup.addEventListener('submit', handleEditFormSubmit);

// Прикрепили обработчик к кнопке открытия попапа добавления карточек
addCardButton.addEventListener('click', () => {
  openPopup(addPopup);
  addFormPopup.reset();
  addButtonSubmit.setAttribute('disabled', true);
  addButtonSubmit.classList.add('popup__save-button_disabled');
});

// Прикрепили обработчик к форме для добавления карточек
addFormPopup.addEventListener('submit', handleAddFormSubmit);

// Создаем экземпляр класса FormValidator для формы редактирования информации о себе
const editFormValidation = new FormValidator(obj, '.popup__form_type_edit');
editFormValidation.enableValidation();

// Создаем экземпляр класса FormValidator для формы добавления карточек
const addFormValidation = new FormValidator(obj, '.popup__form_type_add');
addFormValidation.enableValidation();

closePopups();
