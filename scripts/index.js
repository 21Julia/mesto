// Переменные из блока Профиль
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptionProfile = profile.querySelector('.profile__subtitle');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');

// Переменные попапа редактирования информации
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const closeEditFormButton = editPopup.querySelector('.popup__close-button_type_edit');
const editFormPopup = editPopup.querySelector('.popup__form_type_edit');

// Переменные попапа добавления карточек
const addPopup = document.querySelector('.popup_type_add');
const titleInput = addPopup.querySelector('.popup__input_type_title');
const linkInput = addPopup.querySelector('.popup__input_type_link');
const closeAddFormButton = addPopup.querySelector('.popup__close-button_type_add');
const addFormPopup = addPopup.querySelector('.popup__form_type_add');

// Переменные попапа с картинкой
const imagePopup = document.querySelector('.popup_type_image');
const closeImageButton = imagePopup.querySelector('.popup__close-button_type_image');

// Переменная контейнера для карточек
const cardsList = document.querySelector('.elements__list');


// Функция для открытия попапа и прикрепления слушателя событий для закрытия попапа нажатием на клавишу Esc
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    };
  });
};

// Функция для закрытия попапа и удаления слушателя событий для закрытия попапа нажатием на клавишу Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    };
  });
};

// Функция для редактирования имени и информации о себе
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
};

function handleLikeButton(evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// Функция для создания карточек при помощи template
const createCard = (item) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');

  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__image').alt = item.alt;

  // Обработчик события для лайка
  likeButton.addEventListener('click', handleLikeButton);

  // Обработчик события для удаления карточки
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.element').remove();
  });

  // Обработчик события для открытия картинки в попапе
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    imagePopup.querySelector('.popup__image').src = item.link;
    imagePopup.querySelector('.popup__image').alt = item.alt;
    imagePopup.querySelector('.popup__caption').textContent = item.name;
    openPopup(imagePopup);
  });

  return cardElement;
};

// Функция для создания новой карточки
const renderCard = (item, cardsContainer) => {
  const cardElement = createCard(item);

  cardsContainer.prepend(cardElement);
};

// Функция для добавления новой карточки от пользователя
function handleAddFormSubmit(evt) {
  const titleInputValue = titleInput.value;
  const linkInputValue = linkInput.value;

  evt.preventDefault();

  const card = {
    name: titleInputValue,
    link: linkInputValue,
    alt: titleInputValue
  };

  renderCard(card, cardsList);

  closePopup(addPopup);
};

// Автоматически добавленные карточки при загрузке страницы
initialCards.forEach(card => { renderCard(card, cardsList); });

// Функция для закрытия попапа редактирования информации кликом на тёмный фон
function closeBeyondEditForm (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(editPopup);
  };
};

// Функция для закрытия попапа добавления карточек кликом на тёмный фон
function closeBeyondAddForm (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(addPopup);
  };
};

// Функция для закрытия попапа картинок кликом на тёмный фон
function closeBeyondImageForm (evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(imagePopup);
  };
};


// Прикрепили обработчик к кнопке открытия попапа редактирования информации
editProfileButton.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
});

// Прикрепили обработчик к кнопке закрытия попапа редактирования информации
closeEditFormButton.addEventListener('click', function () {
  closePopup(editPopup);
});

// Прикрепили обработчик к форме для сохранения информации о пользователе
editFormPopup.addEventListener('submit', handleEditFormSubmit);


// Прикрепили обработчик к кнопке открытия попапа добавления карточек
addCardButton.addEventListener('click', function () {
  openPopup(addPopup);
  addFormPopup.reset();
});

// Прикрепили обработчик к кнопке закрытия попапа добавления карточек
closeAddFormButton.addEventListener('click', function () {
  closePopup(addPopup);
});

// Прикрепили обработчик к форме для добавления карточек
addFormPopup.addEventListener('submit', handleAddFormSubmit);


// Прикрепили обработчик к кнопке закрытия попапа картинок
closeImageButton.addEventListener('click', function () {
  closePopup(imagePopup);
});


// Прикрепили обработчик к попапу редактирования информации для закрытия кликом на оверлей
editPopup.addEventListener('click', closeBeyondEditForm);

// Прикрепили обработчик к попапу добавления карточек для закрытия кликом на оверлей
addPopup.addEventListener('click', closeBeyondAddForm);

// Прикрепили обработчик к попапу картинок для закрытия кликом на оверлей
imagePopup.addEventListener('click', closeBeyondImageForm);
