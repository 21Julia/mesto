// Переменные из блока Профиль
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const descriptionProfile = profile.querySelector('.profile__subtitle');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addCardButton = profile.querySelector('.profile__add-button');

// Переменная для нахождения всех попапов
const popups = document.querySelectorAll('.popup');

// Переменные попапа редактирования информации
const editPopup = document.querySelector('.popup_type_edit');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const descriptionInput = editPopup.querySelector('.popup__input_type_description');
const editFormPopup = editPopup.querySelector('.popup__form_type_edit');

// Переменные попапа добавления карточек
const addPopup = document.querySelector('.popup_type_add');
const titleInput = addPopup.querySelector('.popup__input_type_title');
const linkInput = addPopup.querySelector('.popup__input_type_link');
const addFormPopup = addPopup.querySelector('.popup__form_type_add');
const addButtonSubmit = addPopup.querySelector('.popup__save-button');

// Переменные попапа с картинкой
const imagePopup = document.querySelector('.popup_type_image');
const popupImageContainer = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Переменная контейнера для карточек
const cardsList = document.querySelector('.elements__list');

// Переменная template для карточки
const template = document.querySelector('.card-template');


// Функция, закрывающая модальное окно по нажатию на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// Функция для открытия попапа и прикрепления слушателя событий для закрытия попапа нажатием на клавишу Esc
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция для закрытия попапа и удаления слушателя событий для закрытия попапа нажатием на клавишу Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция прикрепления слушателя событий для закрытия попапов кликом на крестик или тёмный фон
const closePopups = () => {
  popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
          if (evt.target.classList.contains('popup_opened')) {
              closePopup(popup);
          };

          if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
          };
      });
  });
};

// Функция для редактирования имени и информации о себе
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
};

// Функция для переключения состояния кнопки лайка
function handleLikeButton(evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// Функция для создания карточек при помощи template
const createCard = item => {
  const cardTemplate = template.content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');
  const elementTitle = cardElement.querySelector('.element__title');
  const elementImage = cardElement.querySelector('.element__image');

  elementTitle.textContent = item.name;;
  elementImage.src = item.link;
  elementImage.alt = item.alt;

  // Обработчик события для лайка
  likeButton.addEventListener('click', handleLikeButton);

  // Обработчик события для удаления карточки
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.element').remove();
  });

  // Обработчик события для открытия картинки в попапе
  elementImage.addEventListener('click', function () {
    popupImageContainer.src = item.link;
    popupImageContainer.alt = item.alt;
    popupCaption.textContent = item.name;
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
initialCards.forEach(card => {renderCard(card, cardsList);});


// Прикрепили обработчик к кнопке открытия попапа редактирования информации
editProfileButton.addEventListener('click', () => {
  openPopup(editPopup);
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
});

// Прикрепили обработчик к форме для сохранения информации о пользователе
editFormPopup.addEventListener('submit', handleEditFormSubmit);

// Прикрепили обработчик к кнопке открытия попапа добавления карточек
addCardButton.addEventListener('click', () => {
  openPopup(addPopup);
  addFormPopup.reset();
  addButtonSubmit.setAttribute('disabled', true);
  addButtonSubmit.classList.add('popup__save-button_disabled');
});

// Прикрепили обработчик к форме для добавления карточек
addFormPopup.addEventListener('submit', handleAddFormSubmit);

closePopups();
