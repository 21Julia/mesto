// Класс отвечает за отрисовку элементов на странице, вставку элементов в контейнер
export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  // Метод отвечает за отрисовку всех исходных элементов
  renderItem() {
    this._items.forEach(item => this._renderer(item));
  }

  addInitialItems(element) {
    this._containerSelector.append(element);
  }

  // Метод, который принимает DOM-элемент новой карточки и добавляет его в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
