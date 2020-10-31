const enableValidation = (parameters) => {

    const showInputError = (formElement, inputElement, errorMessage) => {
        console.log(`#${inputElement.id}-error`);
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(parameters.inputErrorClass);
        errorElement.classList.add(parameters.errorMessageClass);
        errorElement.textContent = errorMessage;
    };

    const hideInputError = (formElement, inputElement) => {
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

    const toggleButtonState = (inputList, buttonElement) => {
        if (hasInvalidInput(inputList)) {
            buttonElement.classList.add(parameters.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(parameters.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    const isValid = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            hideInputError(formElement, inputElement);
        }
    };

    const setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
        const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    const formList = Array.from(document.querySelectorAll(parameters.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
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

