// Класс отвечает за отрисовку элементов на странице, вставку элементов в контейнер
export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  // Метод отвечает за отрисовку всех исходных элементов
  renderItem(items, user) {
    items.forEach(item => this._renderer(item, user));
  }

  addInitialItems(element) {
    this._containerSelector.append(element);
  }

  // Метод, который принимает DOM-элемент новой карточки и добавляет его в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
