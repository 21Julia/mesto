const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/element-karachayevsk.jpg',
    alt: 'Храм, расположенный на горном хребте, окружённый лесом.'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/element-mount-elbrus.jpg',
    alt: 'Долина с верхушками гор в далеке.'
  },
  {
    name: 'Домбай',
    link: './images/element-dombay.jpg',
    alt: 'Склоны заснеженных гор с лесом.'
  },
  {
    name: 'Лермонтов',
    link: './images/element-lermontov.jpg',
    alt: 'Монастырь на фоне гор.'
  },
  {
    name: 'Ессентуки',
    link: './images/element-essentuki.jpg',
    alt: 'Здание в античном стиле с колоннами.'
  },
  {
    name: 'Замок Шато Эркен',
    link: './images/element-castle.jpg',
    alt: 'Вид на озеро с замком в далеке.'
  }
];

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


// Функция для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Функция для редактирования имени и информации о себе
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  closePopup(editPopup);
};

// Функция для создания карточек при помощи template
const addCard = (item) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const deleteButton = cardElement.querySelector('.element__delete-button');

  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__image').alt = item.alt;

  // Обработчик события для лайка
  cardElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

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

  cardsList.prepend(cardElement);

  return cardElement;
};

// Функция для создания новой карточки
const renderCard = (item, cardsContainer) => {
  const cardElement = addCard(item);

  cardsContainer.prepend(cardElement);
};

// Функция для добавления новой карточки от пользователя
function handleAddFormSubmit(evt) {
  const titleInputValue = titleInput.value;
  const linkInputValue = linkInput.value;

  evt.preventDefault();

  const card = {
    name: titleInputValue,
    link: linkInputValue
  };
  initialCards.push(card);
  renderCard(card, cardsList);

  closePopup(addPopup);
};

// Автоматически добавленные карточки при загрузке страницы
initialCards.forEach(card => { renderCard(card, cardsList); });


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
  titleInput.value = '';
  linkInput.value = '';
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
