export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод отрисовки всех карточек из массива
  renderItems(items) {
    items.forEach(this._renderer);
  }

  // метод добавления карточки в контейнер
  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
