import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, closeButtonSelector, imageSelector, titleSelector, data) {
        super(popupSelector, closeButtonSelector);
        this._largeImage = document.querySelector(imageSelector);
        this._largeImageTitle = document.querySelector(titleSelector);
        this._data = data;
    }

    open() {
        this._largeImage.src = this._data.link;
        this._largeImage.alt = this._data.name;
        this._largeImageTitle.textContent = this._data.name;
        super.open();
    }

}