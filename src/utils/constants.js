import karachayevskImage from '../images/element-karachayevsk.jpg';
import elbrusImage from '../images/element-mount-elbrus.jpg';
import dombayImage from '../images/element-dombay.jpg';
import lermontovImage from '../images/element-lermontov.jpg';
import essentukiImage from '../images/element-essentuki.jpg';
import castleImage from '../images/element-castle.jpg';

// Переменные из блока Профиль
const profile = document.querySelector('.profile');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');

// Переменные попапа редактирования информации
const editPopup = document.querySelector('.popup_type_edit');
const editFormPopup = editPopup.querySelector('.popup__form_type_edit');

// Переменные попапа добавления карточек
const addPopup = document.querySelector('.popup_type_add');
const addFormPopup = addPopup.querySelector('.popup__form_type_add');

// Переменная селектора для карточек
const cardsListSelector = '.elements__list';


// Объект карточек для автоматического добавления на страницу
const initialCards = [
  {
    title: 'Карачаевск',
    link: karachayevskImage,
    alt: 'Храм, расположенный на горном хребте, окружённый лесом.'
  },
  {
    title: 'Гора Эльбрус',
    link: elbrusImage,
    alt: 'Долина с верхушками гор в далеке.'
  },
  {
    title: 'Домбай',
    link: dombayImage,
    alt: 'Склоны заснеженных гор с лесом.'
  },
  {
    title: 'Лермонтов',
    link: lermontovImage,
    alt: 'Монастырь на фоне гор.'
  },
  {
    title: 'Ессентуки',
    link: essentukiImage,
    alt: 'Здание в античном стиле с колоннами.'
  },
  {
    title: 'Замок Шато Эркен',
    link: castleImage,
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

export {editProfileButton, addCardButton, editFormPopup, addFormPopup, cardsListSelector, initialCards, obj};
