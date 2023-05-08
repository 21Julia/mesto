import './index.css';

import {avatarProfile, avatarProfileButton, editProfileButton, addCardButton, avatarFormPopup, editFormPopup, addFormPopup, cardsListSelector, obj} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-65', '666ba4aa-bf4b-46da-a423-f025c96c005e');

// Создаем экземпляры класса FormValidator для форм
const avatarFormValidation = new FormValidator(obj, avatarFormPopup);
const editFormValidation = new FormValidator(obj, editFormPopup);
const addFormValidation = new FormValidator(obj, addFormPopup);

// Подключаем валидацию форм
avatarFormValidation.enableValidation();
editFormValidation.enableValidation();
addFormValidation.enableValidation();

const imagePopup = new PopupWithImage('.popup_type_image');

const userInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileDescriptionSelector: '.profile__subtitle'
});

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation');

// Функция для создания экземпляра новой карточки
const createCard = (item, userInformation) => {
  const card = new Card({
    data: item,
    user: userInformation,
    handleCardClick: (item) => {
      imagePopup.open(item);
    },
    handleLikeClick: (card) => {
      if (card.checkLikeButtonStatus()) {
        api.deleteLike(card.cardId)
          .then((res) => {
            card.deleteLike();
            card.changeLikesCounter(res);
          })
      } else {
        api.addLike(card.cardId)
          .then((res) => {
            card.addLike();
            card.changeLikesCounter(res);
          })
      }
    },
    handleDeleteIconClick: (card) => {
      const submitButtonConfirmation = () => {
        api.deleteCard(card.cardId)
          .then(() => {
            card.deleteElement();
          })
      }
      confirmationPopup.open();
      confirmationPopup.setSubmitAction(submitButtonConfirmation);
    }
  }, '.card-template');

  const cardElement = card.generateCard();

  return cardElement;
};

const cardsList = new Section({
  renderer: (card, user) => {
    const cardElement = createCard(card, user);

    cardsList.addInitialItems(cardElement);
  }
}, cardsListSelector);

// Создаем экземпляр класса для попапа изменения аватара
const avatarPopup = new PopupWithForm({
  selectorPopup: '.popup_type_avatar',
  handleFormSubmit: (inputValues) => {
    api.updateAvatar(inputValues)
      .then((items) => {
        avatarProfile.src = items.avatar;
      })
  }
});

// Создаем экземпляр класса для попапа редактирования информации о себе
const editPopup = new PopupWithForm({
  selectorPopup: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    api.updateUserInformation(inputValues)
      .then((item) => {
        userInfo.setUserInfo(item);
      })
  }
});

// Создаем экземпляр класса для попапа добавления новой карточки
const addPopup = new PopupWithForm({
  selectorPopup: '.popup_type_add',
  handleFormSubmit: (inputValues) => {
    api.getNewInformation(inputValues)
      .then((argument) => {
        const [item, userInformation] = argument;

        cardsList.addItem(createCard(item, userInformation));
      })
  }
});


// Загрузка начальной информации о пользователе и карточек с сервера
api.getAllInitialInformation()
  .then((argument) => {
    const [initialCards, userInformation] = argument;

    cardsList.renderItem(initialCards, userInformation);

    avatarProfile.src = userInformation.avatar;
    userInfo.setUserInfo(userInformation);
  })


// Прикрепили обработчик к кнопке открытия попапа редактирования аватара
avatarProfileButton.addEventListener('click', () => {
  avatarPopup.renderLoading(false, 'Сохранить');
  avatarPopup.open();

  avatarFormValidation.resetValidation();
});

// Прикрепили обработчик к кнопке открытия попапа редактирования информации
editProfileButton.addEventListener('click', () => {
  editPopup.setInputValues(userInfo.getUserInfo());
  editPopup.renderLoading(false, 'Сохранить');
  editPopup.open();

  editFormValidation.resetValidation();
});

// Прикрепили обработчик к кнопке открытия попапа добавления карточек
addCardButton.addEventListener('click', () => {
  addPopup.renderLoading(false, 'Создать');

  addPopup.open();

  addFormValidation.resetValidation();
});

// Добавляем слушатели для экземпляров попапов
imagePopup.setEventListeners();
avatarPopup.setEventListeners();
editPopup.setEventListeners();
addPopup.setEventListeners();
confirmationPopup.setEventListeners();
