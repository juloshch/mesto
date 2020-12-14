import {PopupWithForm} from './popupWithForm.js';

export class PopupWithAvatar extends PopupWithForm {
    constructor(popupSelector, closeButtonSelector, submitButtonSelector, handleFormSubmit) {
        super(popupSelector, closeButtonSelector, submitButtonSelector, handleFormSubmit);
    }
}