import '../pages/index.css';
import { initialCards, validationConfig } from './data.js';
import { Card } from '../components/сard.js';
import { FormValidator } from './FormValidator.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { UserInfo } from '../components/userInfo.js';
import { PopupWithImage } from '../components/popupWithImage.js';

const buttonOpenPopup = document.querySelector(".edit-but");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
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

const openProfileValidator = new FormValidator(validationConfig, document.querySelector('#edit-profile-container'));

const openProfilePopup = () => {
    const formData = userInfo.getUserInfo();
    addProfilePopup.fillInputValues(formData);
    openProfileValidator.validateInputs();
    addProfilePopup.open();
};

buttonOpenPopup.addEventListener("click", openProfilePopup);

//карточки из массива
const popupWithImage = new PopupWithImage('.popup__image-popup',
    '.popup__close-image',
    '.popup__image',
    '.popup__image-title');
popupWithImage.setEventListeners();

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage)).createElement();
        return card;
    }
}, '.elements');

cardsSection.renderItems();


// обработка попапа 'добавить место'

const formSubmitAddPlace = (item) => {
    const newElement = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage)).createElement();
    cardsSection.addItem(newElement);
};

const addPlacePopup = new PopupWithForm('#add-place-popup', '#add-place-popup-close-image', '.popup__save-button', formSubmitAddPlace, true);
addPlacePopup.generateForm();
addPlacePopup.setEventListeners();

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('#add-place-container'));

const openAddPlacePopup = () => {
    addPlacePopup.reset();
    addPlaceValidator.disableSubmitButton();
    addPlaceValidator.hideAllErrors();
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