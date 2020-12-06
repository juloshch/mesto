import {Popup} from './popup.js';
import {validationConfig} from '../scripts/data.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, closeButtonSelector, handleFormSubmit) {
        super(popupSelector, closeButtonSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getTemplate() {
        const formElement = this._popup.querySelector('.popup__container');
        return formElement;
    } 

    generateForm() {
        this._element = this._getTemplate();      
        return this._element;
    } 

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__field');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        console.log(this._element)
        this._element.addEventListener('submit', (evt) => {
            console.log('submit')
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }

    open() {
        const savePlaceButton = this._popup.querySelector('.popup__save-button');
        savePlaceButton.disabled = true;
        savePlaceButton.classList.add(validationConfig.inactiveButtonClass);
        super.open();
    }

    close() {
        this._inputList.forEach(input => {
            input.value = '';
        });
        super.close();
    }
}