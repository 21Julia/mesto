// Переменные из блока Профиль
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptionProfile = profile.querySelector('.profile__subtitle');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');

// Переменная для нахождения всех попапов
const popups = document.querySelectorAll('.popup');

// Переменные попапа редактирования информации
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const editFormPopup = editPopup.querySelector('.popup__form_type_edit');

// Переменные попапа добавления карточек
const addPopup = document.querySelector('.popup_type_add');
const titleInput = addPopup.querySelector('.popup__input_type_title');
const linkInput = addPopup.querySelector('.popup__input_type_link');
const addFormPopup = addPopup.querySelector('.popup__form_type_add');

// Переменные попапа с картинкой
const imagePopup = document.querySelector('.popup_type_image');
const popupImageContainer = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Переменная контейнера для карточек
const cardsList = document.querySelector('.elements__list');


// Объект карточек для автоматического добавления на страницу
const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/element-karachayevsk.jpg',
    alt: 'Храм, расположенный на горном хребте, окружённый лесом.'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/element-mount-elbrus.jpg',
    alt: 'Долина с верхушками гор в далеке.'
  },
  {
    name: 'Домбай',
    link: './images/element-dombay.jpg',
    alt: 'Склоны заснеженных гор с лесом.'
  },
  {
    name: 'Лермонтов',
    link: './images/element-lermontov.jpg',
    alt: 'Монастырь на фоне гор.'
  },
  {
    name: 'Ессентуки',
    link: './images/element-essentuki.jpg',
    alt: 'Здание в античном стиле с колоннами.'
  },
  {
    name: 'Замок Шато Эркен',
    link: './images/element-castle.jpg',
    alt: 'Вид на озеро с замком в далеке.'
  }
];


// Объект настроек с селекторами и классами формы
const obj = {
  inputSelector: '.popup__input',
  buttonSubmitSelector: '.popup__save-button',
  buttonSubmitDisabledClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorMessageContainerClass: 'popup__input-error_active',
};

export {profile, nameProfile, descriptionProfile, editProfileButton, addCardButton, popups, editPopup, nameInput, descriptionInput, editFormPopup, addPopup, titleInput, linkInput, addFormPopup, imagePopup, popupImageContainer, popupCaption, cardsList, initialCards, obj};
