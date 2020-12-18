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
addProfilePopup.generateForm();
addProfilePopup.setEventListeners();

function formProfileSubmit(data) {
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
        })
        .finally(() =>{
            addProfilePopup.close();
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
avatarForm.generateForm();
avatarForm.setEventListeners();
const openAvatarPopup = () => {
    avatarForm.reset();
    avatarFormValidator.enableValidation();
    avatarForm.open()
}
buttonOpenAvatarForm.addEventListener("click", openAvatarPopup);
function formAvatarSubmit(data) {
    api.postNewAvatar(data)
        .then((res) => {
            if(res.ok) {
                userInfo.setUserAvatar(data);
                return;
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarForm.close();
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

cardsSection.renderItems();

const loadCards = () => {
    cardsSection.clear();
    api.getAllCards()
    .then(cardsArray => {
        cardsArray.forEach((item) => {
            const newElement = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage), handleDeleteClick, userID, api.like.bind(api), api.removeLike.bind(api)).createElement();
            cardsSection.addItem(newElement);
        })
    })
}

const confirmDeleteCardPopup = new PopupWithSubmit('#delete-button-popup',
                                            '#image-popup-close-button', 
                                            '.popup__delete-yes');

confirmDeleteCardPopup.setEventListeners();
const handleDeleteClick = (id) => {
    confirmDeleteCardPopup.setSubmitAction(() => {
        api.deleteCard(id)
            .then((res) => {
                if (res.ok) {
                    loadCards();
                    return;
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
        confirmDeleteCardPopup.close()
    });
    confirmDeleteCardPopup.open();
}





Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([data, cardsArray]) => {
        userID = data._id;
        profile.querySelector('.profile-info__kusto').src = data.avatar;
        profile.querySelector('.caption__name').textContent = data.name;
        profile.querySelector('.captions__paragraph').textContent = data.about;
        cardsArray.forEach((item) => {
            const newCard = new Card(item, cardTemplate, popupWithImage.open.bind(popupWithImage), handleDeleteClick, userID, snd);
            const newElement = newCard.createElement();
            const sendLike = (id) => {
                api.like(id)
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }
                    })
                    .then ((data) => {
                        newCard.processLikes(data.likes)
                    });
            }
            const sendUnlike = (id) => {
                api.removeLike(id)
                    .then((res) => {
                        if (res.ok) {
                            return res.json()
                        }
                    })
                    .then ((data) => {
                        newCard.processLikes(data.likes)
                    });
            }
            newCard.setSendLike(sendLike);
            newCard.setSendUnlike(sendUnlike);

            cardsSection.addItem(newElement);
        })
    })
    .catch((err) => {
        console.log(err)
    })


// обработка попапа 'добавить место'

const addPlacePopup = new PopupWithForm('#add-place-popup', '#add-place-popup-close-image', '.popup__save-button', formSubmitAddPlace, 'Создать');
addPlacePopup.generateForm();
addPlacePopup.setEventListeners();

function formSubmitAddPlace(item) {
    api.postNewCard(item)
        .then((res) => {
            if (res.ok) {
                loadCards();
                return;
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            addPlacePopup.close();
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