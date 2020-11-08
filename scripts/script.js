const buttonOpenPopup = document.querySelector(".edit-but");
const buttonClosePopup = document.querySelector(".popup__close-image");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const captionName = document.querySelector(".caption__name");
const captionParagraph = document.querySelector(".captions__paragraph");
const popupFieldName = document.querySelector(".popup__field_type_name");
const popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
const formProfileElement = document.querySelector("#edit-profile-container");
const elements = document.querySelector(".elements");
const showImagePopup = document.querySelector('.popup__image-popup');
const largeImage = document.querySelector(".popup__image");
const largeImageTitle = document.querySelector(".popup__image-title");
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
const addPlacePopup = document.querySelector("#add-place-popup");
const buttonCloseAddPlacePopup = document.querySelector("#add-place-popup-close-image");
const placeName = document.querySelector(".popup__field_type_place-name");
const placeLink = document.querySelector(".popup__field_type_place-link");
const formPlaceElement = document.querySelector("#add-place-container");
const buttonCloseImagePopup = document.querySelector("#image-popup-close-button");
const popups = document.querySelectorAll(".popup");
const cardTemplate = document.querySelector("#card-template");

const openPopup = (popup) => {
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', closeOnEscape);
}

const closePopup = (popup) => {
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

//карточки из массива скриптом плюс из кнопки добавить плюс удалить

const handleDeleteCard = (evt) => {
    const elementItem = evt.target.closest(".element");
    elementItem.remove();
};

const handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__heart_liked');
};

const handleOpenCard = (data) => {
    largeImage.src = data.link;
    largeImage.alt = data.name;
    largeImageTitle.textContent = data.name;
    openPopup(showImagePopup);
}

function createElement(data) {
    const cardElement = cardTemplate.content.cloneNode(true);
    const elementPic = cardElement.querySelector(".element__pic");
    elementPic.src = data.link;
    elementPic.alt = data.name;
    cardElement.querySelector(".element__title").textContent = data.name;
    const currentDeleteButton = cardElement.querySelector(".element__bin-button");
    currentDeleteButton.addEventListener('click', handleDeleteCard);
    const likeButton = cardElement.querySelector(".element__heart");
    likeButton.addEventListener('click', handleLikeIcon);
    elementPic.addEventListener('click', () => handleOpenCard(data));  
    return cardElement;
}

initialCards.forEach((data) => {
    elements.append(createElement(data));
});

// обработка попапа 'добавить место'

const formSubmitAddPlace = (evt) => {
    evt.preventDefault();
    const newElementData = {
        name: placeName.value,
        link: placeLink.value
    };
    const newElement = createElement(newElementData);
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
