export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  // метод возвращает текущие значения из разметки
  getUserInfo() {
    const profileInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return profileInfo;
  }

  // метод получает объект с ключами и устанавливает их в разметку
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.job;
  }
}
