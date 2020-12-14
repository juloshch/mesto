import {Popup} from './popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, closeButtonSelector, submitButtonSelector, handleFormSubmit, submitButtonText) {
        super(popupSelector, closeButtonSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButtonSelector = submitButtonSelector;
        this._submitButtonText = submitButtonText;
    }

    _getTemplate() {
        const formElement = this._popup.querySelector('.popup__container');
        return formElement;
    } 

    generateForm() {
        this._element = this._getTemplate();  
        this._submitButton = this._element.querySelector(this._submitButtonSelector);
        this._inputList = this._element.querySelectorAll('.popup__field');
        return this._element;
    } 

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    fillInputValues(data) {
        for (let key in data) {
            const inputSelector = 'input[name="' + key + '"]';
            const input = this._element.querySelector(inputSelector);
            if (input) {
                input.value = data[key];
            }
        }
    }

    setEventListeners() {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton.textContent = 'Сохранение...';
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    reset() {
        if (this._inputList) {
            this._inputList.forEach(input => {
                input.value = '';
            });
        }
    }

    open() {
        this._submitButton.textContent = this._submitButtonText;
        super.open();
    }
}