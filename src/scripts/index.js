import '../pages/index.css';
import { initialCards, validationConfig } from './data.js';
import { Card } from '../components/сard.js';
import { FormValidator } from './FormValidator.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { UserInfo } from '../components/userInfo.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { Api } from './api.js';
import { PopupWithSubmit } from '../components/popupWithSubmit.js';
import { PopupWithAvatar } from '../components/popupWithAvatar.js';

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-18/",
    headers: {
        authorization: '40d8cb7e-f502-4a58-bbf0-76039287601c',
        'Content-Type': 'application/json'
    }
});



let userID = undefined;
const profile = document.querySelector('.profile');


const buttonOpenPopup = document.querySelector(".edit-but");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
const cardTemplate = document.querySelector('#card-template');

const userInfo = new UserInfo({
    nameSelector: '.caption__name',
    infoSelector: '.captions__paragraph'
});

const formProfileSubmit = (data) => {
    api.updateUserInfo(data)
        .then((res) => {
            if (res.ok) {
                userInfo.setUserInfo(data);
                return;
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
};

const addProfilePopup = new PopupWithForm('#edit-profile-popup', '.popup__close-image', '.popup__save-button', formProfileSubmit);
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

//const avatarForm = new PopupWithAvatar('#popup-with-avatar', '#add-place-popup-close-image', '.popup__save-button')

//карточки из массива
const popupWithImage = new PopupWithImage('.popup__image-popup',
    '.popup__close-image',
    '.popup__image',
    '.popup__image-title');
popupWithImage.setEventListeners();



const cardsSection = new Section({
    items: [],
    renderer: (item) => {
        const card = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage), userID).createElement();
        return card;
    }
}, '.elements');

cardsSection.renderItems();

const loadCards = () => {
    cardsSection.clear();
    api.getAllCards()
    .then(cardsArray => {
        cardsArray.forEach((item) => {
            const newElement = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage), handleDeleteClick, userID).createElement();
            cardsSection.addItem(newElement);
        })
    })
}

const popupWithSubmit = new PopupWithSubmit('#delete-button-popup',
                                            '#image-popup-close-button', 
                                            '.popup__delete-yes');

popupWithSubmit.setEventListeners();
const handleDeleteClick = (id) => {
    popupWithSubmit.setSubmitAction(() => {
        api.deleteCard(id)
            .then((res) => {
                if (res.ok) {
                    loadCards()
                }
            })
        popupWithSubmit.close()
    });
    popupWithSubmit.open();
}


Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([data, cardsArray]) => {
        userID = data._id;
        profile.querySelector('.profile-info__kusto').src = data.avatar;
        profile.querySelector('.caption__name').textContent = data.name;
        profile.querySelector('.captions__paragraph').textContent = data.about;

        cardsArray.forEach((item) => {
            const newElement = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage), handleDeleteClick, userID).createElement();
            cardsSection.addItem(newElement);
        })
    })
    .catch((err) => {
        console.log(err)
    })


// обработка попапа 'добавить место'

const formSubmitAddPlace = (item) => {
    api.postNewCard(item)
        .then((res) => {
            if (res.ok) {
                loadCards();
            }
        })
};

const addPlacePopup = new PopupWithForm('#add-place-popup', '#add-place-popup-close-image', '.popup__save-button', formSubmitAddPlace);
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