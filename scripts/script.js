import {initialCards, validationConfig} from './data.js';
import {Card} from './сard.js';
import {FormValidator} from './FormValidator.js';
import {closePopup} from './utils.js';
import {Section} from './section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import {UserInfo} from '../components/userInfo.js';

const buttonOpenPopup = document.querySelector(".edit-but");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
const popups = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector('#card-template');

const userInfo = new UserInfo({
    nameSelector: '.caption__name', 
    infoSelector: '.captions__paragraph'
});

const formProfileSubmit = (data) => {
    userInfo.setUserInfo(data);
};

const addProfilePopup = new PopupWithForm('#edit-profile-popup', '.popup__close-image', '.popup__save-button', formProfileSubmit, false);
addProfilePopup.generateForm();
addProfilePopup.setEventListeners();

const openProfilePopup = () => {
    const formData = userInfo.getUserInfo();
    addProfilePopup.fillInputValues(formData);
    addProfilePopup.open();
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

buttonOpenPopup.addEventListener("click", openProfilePopup);

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

const addPlacePopup = new PopupWithForm('#add-place-popup', '#add-place-popup-close-image', '.popup__save-button', formSubmitAddPlace, true);
addPlacePopup.generateForm();
addPlacePopup.setEventListeners();

const openAddPlacePopup = () => {
    addPlacePopup.open();
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