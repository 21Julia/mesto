import {popupImageContainer, popupCaption, imagePopup} from '../utils/constants.js';

export default class Card {
  // Принимаем в конструктор данные карточки и селектор её темплейт-элемента
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
  }

  // Получаем готовую разметку карточки из темплейта для размещения на странице
  _getTemplate() {
    // Забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    // Вернём DOM-элемент карточки
    return cardElement;
  }

  // Метод добавляет данные в разметку и подготавливает карточку к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._setEventListeners();

    // Добавим данные
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._alt;

    // Вернём элемент наружу
    return this._element;
  }

  // Метод для удаления карточки
  _handleDeleteButton() {
    this._deleteButton.closest('.element').remove();
  }

  // Метод для переключения состояния кнопки лайка
  _handleLikeButton(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  // Метод для открытия картинки в попапе
  _handleOpenImagePopup() {
    popupImageContainer.src = this._link;
    popupImageContainer.alt = this._alt;
    popupCaption.textContent = this._name;
    this._openPopup();
  }

  // Метод для открытия попапа и прикрепления слушателя событий для закрытия попапа нажатием на клавишу Esc
  _openPopup() {
    imagePopup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._closePopupByEscape(evt);
    });
  }

  // Метод, закрывающий модальное окно по нажатию на Esc
  _closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
      this._closePopup();
    };
  }

  // Метод для закрытия попапа картинки кликом на крестик или тёмный фон
  _closePopupByMouse(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this._closePopup();
    };

    if (evt.target.classList.contains('popup__close-button')) {
      this._closePopup();
    };
  }

  // Метод для закрытия попапа и удаления слушателя событий для закрытия попапа нажатием на клавишу Esc
  _closePopup() {
    imagePopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._closePopupByEscape(evt);
    });
  }

  // Метод для добавления слушателей события
  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._image.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });

    imagePopup.addEventListener('mousedown', (evt) => {
      this._closePopupByMouse(evt);
    });
  }
}
