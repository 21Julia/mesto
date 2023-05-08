// Переменные из блока Профиль
const profile = document.querySelector('.profile');
const avatarProfile = profile.querySelector('.profile__image');
const avatarProfileButton = profile.querySelector('.profile__avatar-button');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');

// Переменные попапа редактирования аватара пользователя
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarFormPopup = avatarPopup.querySelector('.popup__form_type_avatar');

// Переменные попапа редактирования информации
const editPopup = document.querySelector('.popup_type_edit');
const editFormPopup = editPopup.querySelector('.popup__form_type_edit');

// Переменные попапа добавления карточек
const addPopup = document.querySelector('.popup_type_add');
const addFormPopup = addPopup.querySelector('.popup__form_type_add');

// Переменная селектора для карточек
const cardsListSelector = '.elements__list';

// Объект настроек с селекторами и классами формы
const obj = {
  inputSelector: '.popup__input',
  buttonSubmitSelector: '.popup__save-button',
  buttonSubmitDisabledClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorMessageContainerClass: 'popup__input-error_active',
};

export {avatarProfile, avatarProfileButton, editProfileButton, addCardButton, avatarFormPopup, editFormPopup, addFormPopup, cardsListSelector, obj};
