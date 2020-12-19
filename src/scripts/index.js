import '../pages/index.css';
import { validationConfig } from './data.js';
import { Card } from '../components/сard.js';
import { FormValidator } from './FormValidator.js';
import { Section } from '../components/section.js';
import { PopupWithForm } from '../components/popupWithForm.js';
import { UserInfo } from '../components/userInfo.js';
import { PopupWithImage } from '../components/popupWithImage.js';
import { Api } from './api.js';
import { PopupWithSubmit } from '../components/popupWithSubmit.js';

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
    infoSelector: '.captions__paragraph',
    avatarSelector: '.profile-info__kusto'
});


const addProfilePopup = new PopupWithForm('#edit-profile-popup', '.popup__close-image', '.popup__save-button', formProfileSubmit, 'Сохранить');
addProfilePopup.setEventListeners();

function formProfileSubmit(data) {
    api.updateUserInfo(data)
        .then((responseData) => {
            userInfo.setUserInfo(data);
            addProfilePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
};

const openProfileValidator = new FormValidator(validationConfig, document.querySelector('#edit-profile-container'));

const openProfilePopup = () => {
    const formData = userInfo.getUserInfo();
    openProfileValidator.enableValidation();
    addProfilePopup.fillInputValues(formData);
    openProfileValidator.validateInputs();
    addProfilePopup.open();
};

buttonOpenPopup.addEventListener("click", openProfilePopup);

const avatarFormValidator = new FormValidator(validationConfig, document.querySelector('#avatar-container'));
const buttonOpenAvatarForm = document.querySelector('.profile-info__change-avatar-button')
const avatarForm = new PopupWithForm('#popup-with-avatar', '#add-place-popup-close-image', '.popup__save-button', formAvatarSubmit, 'Сохранить');
avatarForm.setEventListeners();
const openAvatarPopup = () => {
    avatarForm.reset();
    avatarFormValidator.enableValidation();
    avatarForm.open()
}
buttonOpenAvatarForm.addEventListener("click", openAvatarPopup);
function formAvatarSubmit(data) {
    api.postNewAvatar(data)
        .then((resesponseData) => {
            userInfo.setUserAvatar(data);
            avatarForm.close();

        })
        .catch((err) => {
            console.log(err);
        })
}

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

const confirmDeleteCardPopup = new PopupWithSubmit('#delete-button-popup',
    '#image-popup-close-button');

confirmDeleteCardPopup.setEventListeners();
const handleDeleteClick = (id) => {
    confirmDeleteCardPopup.setSubmitAction(() => {
        api.deleteCard(id)
            .then((responseData) => {
                document.getElementById(id).remove();
                confirmDeleteCardPopup.close()
            })
            .catch((err) => {
                console.log(err);
            })
    });
    confirmDeleteCardPopup.open();
}


function sendLike(id) {
    api.like(id)
        .then((responseData) => {
            this.processLikes(responseData.likes)
        });
}

function sendUnlike(id) {
    api.removeLike(id)
        .then((responseData) => {
            this.processLikes(responseData.likes)
        });
}

Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([data, cardsArray]) => {
        userID = data._id;
        userInfo.setUserAvatar({
            link: data.avatar
        });
        userInfo.setUserInfo(data);
        cardsArray.forEach((item) => {
            const newCard = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage), handleDeleteClick, userID, sendLike, sendUnlike);
            const newElement = newCard.createElement();
            cardsSection.addItem(newElement);
        })
    })
    .catch((err) => {
        console.log(err)
    })


// обработка попапа 'добавить место'

const addPlacePopup = new PopupWithForm('#add-place-popup', '#add-place-popup-close-image', '.popup__save-button', formSubmitAddPlace, 'Создать');
addPlacePopup.setEventListeners();

function formSubmitAddPlace(item) {
    api.postNewCard(item)
        .then((responseData) => {
            const newCard = new Card(responseData, cardTemplate, popupWithImage.open.bind(popupWithImage), handleDeleteClick, userID, sendLike, sendUnlike);
            const newElement = newCard.createElement();
            cardsSection.prependItem(newElement);
            addPlacePopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
};

const addPlaceValidator = new FormValidator(validationConfig, document.querySelector('#add-place-container'));

const openAddPlacePopup = () => {
    addPlacePopup.reset();
    addPlaceValidator.enableValidation();
    addPlaceValidator.disableSubmitButton();
    addPlaceValidator.hideAllErrors();
    addPlacePopup.open();
}

buttonOpenAddPlacePopup.addEventListener("click", openAddPlacePopup);

// валидация
const preventDefaultAll = (parameters) => {
    const formList = Array.from(document.querySelectorAll(parameters.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    });
}

preventDefaultAll(validationConfig);