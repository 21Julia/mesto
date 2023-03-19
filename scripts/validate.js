const obj = {
  form: '.popup__form',
  input: '.popup__input',
  buttonSubmit: '.popup__save-button',
  buttonSubmitDisabled: 'popup__save-button_disabled',
  inputError: 'popup__input_type_error',
  errorMessageContainer: 'popup__input-error_active',
};


// Функция, которая добавляет полю класс с ошибкой и показывает сообщение с ошибкой под полем
const showInputError = (form, input, errorMessage, {inputError, errorMessageContainer}) => {
  const errorContainer = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputError);

  // Показываем сообщение об ошибке
  errorContainer.textContent = errorMessage;
  errorContainer.classList.add(errorMessageContainer);
};


// Функция, которая удаляет у поля класс с ошибкой и скрывает сообщение с ошибкой под полем
const hideInputError = (form, input, {inputError, errorMessageContainer}) => {
  const errorContainer = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputError);

  // Скрываем сообщение об ошибке
  errorContainer.classList.remove(errorMessageContainer);
  errorContainer.textContent = '';
};


// Функция, проверяющая валидность поля и вызывающая функции для открытия или закрытия сообщения об ошибке
const checkInputValidity = (form, input, {...rest}) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, rest);
  } else {
    hideInputError(form, input, rest);
  };
};


// Функция, возвращающая true, если хотя бы одно поле невалидно
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};


// Функция включения и отключения кнопки submit
const toggleButtonState = (inputList, buttonSubmit, {buttonSubmitDisabled}) => {
  if (hasInvalidInput(inputList)) {
    // Отключает кнопку, при наличии невалидных полей
    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.classList.add(buttonSubmitDisabled);
  } else {
    // Включает кнопку, если все поля валидны
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove(buttonSubmitDisabled);
  };
};


// Функция для добавления слушателей события всем полям ввода внутри формы
const setEventListeners = (form, {input, buttonSubmit, ...rest}) => {
  // Найдем все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll(input));
  const button = form.querySelector(buttonSubmit);

  // Вызываем функцию для блокировки кнопки до начала ввода данных
  toggleButtonState(inputList, button, rest);

  // Обходим все элементы массива инпутов
  inputList.forEach((inputItem) => {
    // Добавляем каждому полю ввода обработчик события input
    inputItem.addEventListener('input', () => {
      // Вызываем функцию для проверки валидности поля
      checkInputValidity(form, inputItem, rest);
      // Проверяем, может ли быть кнопка разблокирована
      toggleButtonState(inputList, button, rest);
    });
  });
};


// Функция для добавления слушателей события всем формам в DOM
const enableValidation = ({form, ...rest}) => {
  // Найдем все формы на странице, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(form));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

enableValidation(obj);
