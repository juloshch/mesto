import {Popup} from './popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, closeButtonSelector, imageSelector, titleSelector) {
        super(popupSelector, closeButtonSelector);
        this._largeImage = document.querySelector(imageSelector);
        this._largeImageTitle = document.querySelector(titleSelector);
    }

    open(data) {
        this._largeImage.src = data.link;
        this._largeImage.alt = data.name;
        this._largeImageTitle.textContent = data.name;
        super.open();
    }

}