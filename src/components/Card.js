export default class Card {
  constructor({data, user, handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = user._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._templateSelector = templateSelector;
  }

  // Метод добавляет данные в разметку и подготавливает карточку к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._elementTitle = this._element.querySelector('.element__title');
    this._image = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._deleteButton = this._element.querySelector('.element__delete-button');

    this._checkId();

    this._setEventListeners();

    this._elementTitle.textContent = this._title;
    this._image.src = this._link;
    this._likeCounter.textContent = this._likes.length;

    return this._element;
  }

  // Метод для удаления карточки
  deleteElement() {
    this._element.remove();
    this._element = null;
  }

  // Проверяем есть ли айди текущего юзера в массиве лайков
  checkLikeButtonStatus() {
    return this._likes.some(like => like._id === this._userId)
  }

  changeLikesCounter(data) {
    this._likes = data.likes;
    this._likeCounter.textContent = data.likes.length;
  }

  addLike() {
    this._likeButton.classList.add('element__like-button_active');
  }

  deleteLike() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  // Получаем готовую разметку карточки из темплейта для размещения на странице
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    // Вернём DOM-элемент карточки
    return cardElement;
  }

  // Метод для проверки id владельца карточки и удаления иконки корзины
  _checkId() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick({
        title: this._title,
        link: this._link});
    });
  }
}
