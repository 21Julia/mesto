export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._buttonSubmitSelector = data.buttonSubmitSelector;
    this._buttonSubmitDisabledClass = data.buttonSubmitDisabledClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorMessageContainerClass = data.errorMessageContainerClass;
    this._formElement = formElement;
  }

  // Метод, который включает валидацию формы
  enableValidation() {
    this._button = this._formElement.querySelector(this._buttonSubmitSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._setEventListeners();
  }

  // Метод для добавления слушателей события всем полям ввода внутри формы
  _setEventListeners() {
    // Вызываем метод для блокировки кнопки до начала ввода данных
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._input = input;
        // Вызываем метод для проверки валидности поля
        this._checkInputValidity();
        // Проверяем, может ли быть кнопка разблокирована
        this._toggleButtonState();
      })
    });
  }

  // Метод включения и отключения кнопки submit
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // Отключает кнопку, при наличии невалидных полей
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._buttonSubmitDisabledClass);
    } else {
      // Включает кнопку, если все поля валидны
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._buttonSubmitDisabledClass);
    };
  }

  // Метод, возвращающий true, если хотя бы одно поле невалидно
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // Метод, проверяющий валидность поля и вызывающий методы для открытия или закрытия сообщения об ошибке
  _checkInputValidity() {
      if (!this._input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    };
  }

  // Метод, который удаляет у поля класс с ошибкой и скрывает сообщение с ошибкой под полем
  _hideInputError() {
    this._errorContainer = this._formElement.querySelector(`.${this._input.id}-error`);
    this._input.classList.remove(this._inputErrorClass);

    // Скрываем сообщение об ошибке
    this._errorContainer.textContent = '';
    this._errorContainer.classList.remove(this._errorMessageContainerClass);
  }

  // Метод, который добавляет полю класс с ошибкой и показывает сообщение с ошибкой под полем
  _showInputError() {
    this._errorContainer = this._formElement.querySelector(`.${this._input.id}-error`);
    this._input.classList.add(this._inputErrorClass);

    // Показываем сообщение об ошибке
    this._errorContainer.textContent = this._input.validationMessage;
    this._errorContainer.classList.add(this._errorMessageContainerClass);
  }
}
