export class Section {
    constructor ({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        // this._items.reverse().forEach(item => {
        //     const element = this._renderer(item);
        //     this.addItem(element);
        // })
    }

    addItem(element) {
        this._container.append(element);
    }

    clear() {
        while (this._container.firstChild) {
            this._container.firstChild.remove();
        }
    }
}