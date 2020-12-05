import {initialCards} from './data.js';
import {Card} from './сard.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup, showImagePopup} from './utils.js';
import {Section} from './section.js';

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorMessageClass: 'popup__input-error_active'
};
const buttonOpenPopup = document.querySelector(".edit-but");
const buttonClosePopup = document.querySelector(".popup__close-image");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const captionName = document.querySelector(".caption__name");
const captionParagraph = document.querySelector(".captions__paragraph");
const popupFieldName = document.querySelector(".popup__field_type_name");
const popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
const formProfileElement = document.querySelector("#edit-profile-container");
const elements = document.querySelector(".elements");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
const addPlacePopup = document.querySelector("#add-place-popup");
const buttonCloseAddPlacePopup = document.querySelector("#add-place-popup-close-image");
const placeName = document.querySelector(".popup__field_type_place-name");
const placeLink = document.querySelector(".popup__field_type_place-link");
const formPlaceElement = document.querySelector("#add-place-container");
const buttonCloseImagePopup = document.querySelector("#image-popup-close-button");
const popups = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector('#card-template');

const openProfilePopup = () => {
    popupFieldName.value = captionName.innerText;
    popupFieldParagraph.value = captionParagraph.innerText;
    openPopup(editProfilePopup);
};

const closeOnBackground = (event) => {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup(event.target);
};

Array.from(popups).forEach((popup) => {
    popup.addEventListener('click', closeOnBackground);
});


const formProfileSubmit = (evt) => {
    evt.preventDefault();
    captionName.textContent = popupFieldName.value;
    captionParagraph.textContent = popupFieldParagraph.value;
    closePopup(editProfilePopup);
};

buttonOpenPopup.addEventListener("click", openProfilePopup);
buttonClosePopup.addEventListener("click", () => closePopup(editProfilePopup));
formProfileElement.addEventListener('submit', formProfileSubmit); 

//карточки из массива

new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, cardTemplate).createElement();
            return card;
        }
    },
     '.elements').renderItems();


// обработка попапа 'добавить место'

const formSubmitAddPlace = (evt) => {
    evt.preventDefault();
    const newElementData = {
        name: placeName.value,
        link: placeLink.value
    };
    const newElement = new Card(newElementData, cardTemplate).createElement();
    elements.prepend(newElement);
    closePopup(addPlacePopup);
};

const openAddPlacePopup = () => {
    placeName.value = '';
    placeLink.value = '';
    const savePlaceButton = addPlacePopup.querySelector('.popup__save-button');
    savePlaceButton.disabled = true;
    savePlaceButton.classList.add(validationConfig.inactiveButtonClass); 
    openPopup(addPlacePopup);
}

buttonOpenAddPlacePopup.addEventListener("click", openAddPlacePopup);
buttonCloseAddPlacePopup.addEventListener("click", () => closePopup(addPlacePopup));
formPlaceElement.addEventListener('submit', formSubmitAddPlace);
buttonCloseImagePopup.addEventListener("click", () => closePopup(showImagePopup));

const enableValidation = (parameters) => {
    const formList = Array.from(document.querySelectorAll(parameters.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        new FormValidator(parameters, formElement).enableValidation();
    });
}

enableValidation(validationConfig);