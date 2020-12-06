import {initialCards, validationConfig} from './data.js';
import {Card} from './сard.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup} from './utils.js';
import {Section} from './section.js';
import { PopupWithForm } from '../components/popupWithForm.js';

const buttonOpenPopup = document.querySelector(".edit-but");
const buttonClosePopup = document.querySelector(".popup__close-image");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const captionName = document.querySelector(".caption__name");
const captionParagraph = document.querySelector(".captions__paragraph");
const popupFieldName = document.querySelector(".popup__field_type_name");
const popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
const formProfileElement = document.querySelector("#edit-profile-container");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
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

const cardsSection = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, cardTemplate).createElement();
            return card;
        }
    }, '.elements');
     
cardsSection.renderItems();


// обработка попапа 'добавить место'

const formSubmitAddPlace = (item) => {
    console.log(item);
    const newElement = new Card(item, cardTemplate).createElement();
    cardsSection.addItem(newElement);
};

const popupWithForm = new PopupWithForm('#add-place-popup', '#add-place-popup-close-image', formSubmitAddPlace);
popupWithForm.generateForm();
popupWithForm.setEventListeners();

const openAddPlacePopup = () => {
    popupWithForm.open();
}

buttonOpenAddPlacePopup.addEventListener("click", openAddPlacePopup);

// валидация
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