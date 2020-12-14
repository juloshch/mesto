import {Popup} from './popup.js';

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, closeButtonSelector, submitButtonSelector, handleFormSubmit) {
        super(popupSelector, closeButtonSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButtonSelector = submitButtonSelector;
        this._element = this._popup.querySelector('.popup__container');
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // console.log('что угодно')
            this._handleSubmitCallback();
        });
        super.setEventListeners();
    }
}