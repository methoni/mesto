export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // метод отрисовки всех карточек из массива
  renderItems() {
    this._items.forEach(this._renderer);
  }

  // метод добавления карточки в контейнер
  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
