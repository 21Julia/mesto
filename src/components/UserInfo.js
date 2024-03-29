// Класс отвечает за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(profileDescriptionSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  keepInformation(userInformation) {
    this._user = userInformation;
  }

  putInformation() {
    return this._user;
  }

  // Метод возвращает объект с текущими данными пользователя, которые вставляются в форму при открытии попапа
  getUserInfo() {
    const profile = {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    };

    return profile;
  }

  // Метод принимает новые данные пользователя и добавляет их в профайл
  setUserInfo(inputValues) {
    this._profileName.textContent = inputValues.name;
    this._profileDescription.textContent = inputValues.about;
    this._profileAvatar.src = inputValues.avatar
  }
}
