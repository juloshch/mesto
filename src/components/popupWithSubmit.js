import {Popup} from './popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, closeButtonSelector) {
        super(popupSelector, closeButtonSelector);
        this._element = this._popup.querySelector('.popup__container');
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
        });
        super.setEventListeners();
    }
}