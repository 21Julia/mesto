export default class Card {
  // Принимаем в конструктор данные карточки и селектор её темплейт-элемента
  constructor(data, templateSelector, handleOpenImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._handleOpenImagePopup = handleOpenImagePopup;
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
    this._element.remove();
    this._element = null;
  }

  // Метод для переключения состояния кнопки лайка
  _handleLikeButton() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  // Метод для добавления слушателей события
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._image.addEventListener('click', () => {
      this._handleOpenImagePopup(this._link, this._alt, this._name);
    });
  }
}
