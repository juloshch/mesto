import {initialCards} from './data.js';
import {Card} from './Card.js';

const buttonOpenPopup = document.querySelector(".edit-but");
const buttonClosePopup = document.querySelector(".popup__close-image");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const captionName = document.querySelector(".caption__name");
const captionParagraph = document.querySelector(".captions__paragraph");
const popupFieldName = document.querySelector(".popup__field_type_name");
const popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
const formProfileElement = document.querySelector("#edit-profile-container");
const elements = document.querySelector(".elements");
export const showImagePopup = document.querySelector('.popup__image-popup');
export const largeImage = document.querySelector(".popup__image");
export const largeImageTitle = document.querySelector(".popup__image-title");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
const addPlacePopup = document.querySelector("#add-place-popup");
const buttonCloseAddPlacePopup = document.querySelector("#add-place-popup-close-image");
const placeName = document.querySelector(".popup__field_type_place-name");
const placeLink = document.querySelector(".popup__field_type_place-link");
const formPlaceElement = document.querySelector("#add-place-container");
const buttonCloseImagePopup = document.querySelector("#image-popup-close-button");
const popups = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector('#card-template');

export const openPopup = (popup) => {
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', closeOnEscape);
}

export const closePopup = (popup) => {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(event) {
    if (event.keyCode === 27) {
       const openedPopup = document.querySelector('.popup_is-opened');
       closePopup(openedPopup);
    }
}

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

initialCards.forEach((data) => {
    elements.append(new Card(data, cardTemplate).createElement());
});

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
    savePlaceButton.classList.add('popup__save-button_disabled'); 
    openPopup(addPlacePopup);
}

buttonOpenAddPlacePopup.addEventListener("click", openAddPlacePopup);
buttonCloseAddPlacePopup.addEventListener("click", () => closePopup(addPlacePopup));
formPlaceElement.addEventListener('submit', formSubmitAddPlace);
buttonCloseImagePopup.addEventListener("click", () => closePopup(showImagePopup));
