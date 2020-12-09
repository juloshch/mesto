export class FormValidator {
    constructor (parameters, formElement) {
        this._parameters = parameters;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._parameters.inputErrorClass);
        errorElement.classList.add(this._parameters.errorMessageClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._parameters.inputErrorClass);
        errorElement.classList.remove(this._parameters.errorMessageClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState = (buttonElement) => {
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._parameters.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._parameters.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    enableValidation = () => {
        const buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);
        this._toggleButtonState(buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(buttonElement);
            });
        });
    };
}
