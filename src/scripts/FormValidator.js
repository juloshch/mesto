export class FormValidator {
    constructor (parameters, formElement) {
        this._parameters = parameters;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);

    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._parameters.inputErrorClass);
        errorElement.classList.add(this._parameters.errorMessageClass);
        errorElement.textContent = errorMessage;
    };

    hideInputError = (inputElement) => {
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

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._parameters.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._parameters.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    };

    validateInputs = () => {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._isValid(inputElement);
        });
    }

    hideAllErrors = () => {
        this._inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
    }

    disableSubmitButton = () => {
        this._buttonElement.classList.add(this._parameters.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    enableValidation = () => {
        this._toggleButtonState(this._buttonElement);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(this._buttonElement);
            });
        });
    };
}
