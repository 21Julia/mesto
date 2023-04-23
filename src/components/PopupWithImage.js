import Popup from './Popup.js';

// Класс вставляет в попап картинку с src изображения и подписью к картинке
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupImageContainer = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open(data) {
    this._popupCaption.textContent = data.title;
    this._popupImageContainer.src = data.link;
    this._popupImageContainer.alt = data.alt;

    super.open();
  }
}
