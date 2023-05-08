// Класс отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);

    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    this._openedPopupClass = 'popup_opened';
    this._popupCloseButtonClass = 'popup__close-button';

    this._popup.addEventListener('mousedown', (evt) => {
      this._handleMouseClick(evt);
    });
  }

  open() {
    this._popup.classList.add(this._openedPopupClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._openedPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMouseClick(evt) {
    if (evt.target.classList.contains(this._openedPopupClass)) {
      this.close();
    };

    if (evt.target.classList.contains(this._popupCloseButtonClass)) {
      this.close();
    };
  }
}
