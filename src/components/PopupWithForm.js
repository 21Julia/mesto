import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({selectorPopup, handleFormSubmit}) {
    super(selectorPopup);

    this._handleFormSubmit = handleFormSubmit;
  }

  // Метод наследует родительский обработчик клика по иконке закрытия и добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();

    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this.close();
    });
  }

  // Метод вставляет данные в инпуты
  setInputValues(data) {
    this._inputList.forEach(input => input.value = data[input.name]);
  }

  // Метод наследует родительский и при закрытии попапа сбрасывает форму
  close() {
    super.close();

    this._form.reset();
  }

  // Метод собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }
}
