const showInputError = (formElement, inputElement, errorMessage, parameters) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(parameters.inputErrorClass);
    errorElement.classList.add(parameters.errorMessageClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, parameters) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(parameters.inputErrorClass);
    errorElement.classList.remove(parameters.errorMessageClass);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, parameters) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(parameters.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(parameters.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const isValid = (formElement, inputElement, parameters) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, parameters);
    } else {
        hideInputError(formElement, inputElement, parameters);
    }
};

const setEventListeners = (formElement, parameters) => {
    const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
    const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, parameters);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, parameters);
            toggleButtonState(inputList, buttonElement, parameters);
        });
    });
};


const enableValidation = (parameters) => {
    const formList = Array.from(document.querySelectorAll(parameters.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, parameters);
    });
}



enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorMessageClass: 'popup__input-error_active'
});

