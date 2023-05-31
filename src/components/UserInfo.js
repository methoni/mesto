export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // метод возвращает текущие значения из разметки
  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return profileInfo;
  }

  // метод получает объект с ключами и устанавливает их в разметку
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._avatar.src = userData.avatar;
  }
}
