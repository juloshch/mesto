const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const buttonOpenPopup = document.querySelector(".edit-but");
const buttonClosePopup = document.querySelector(".popup__close-image");
const editProfilePopup = document.querySelector("#edit-profile-popup");
const captionName = document.querySelector(".caption__name");
const captionParagraph = document.querySelector(".captions__paragraph");
const popupFieldName = document.querySelector(".popup__field_type_name");
const popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
const formElement = document.querySelector("#edit-profile-container");

const popupToggle = (popup) => {
    popup.classList.toggle("popup_is-opened");
};

const openPopup = () => {
    popupFieldName.value = captionName.innerText;
    popupFieldParagraph.value = captionParagraph.innerText;
    popupToggle(editProfilePopup);
};

const formSubmitHandler = (evt) => {
    evt.preventDefault();
    captionName.textContent = popupFieldName.value;
    captionParagraph.textContent = popupFieldParagraph.value;
    popupToggle(editProfilePopup);
};

buttonOpenPopup.addEventListener("click", openPopup);
buttonClosePopup.addEventListener("click", () => popupToggle(editProfilePopup));
formElement.addEventListener('submit', formSubmitHandler); 


//карточки из массива скриптом плюс из кнопки добавить плюс удалить

const elements = document.querySelector(".elements");
const showImagePopup = document.querySelector('.popup__image-popup');
const largeImage = document.querySelector(".popup__image");
const largeImageTitle = document.querySelector(".popup__image-title");

function createElement(data) {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector(".element__pic").src = data.link;
    cardElement.querySelector(".element__title").textContent = data.name;
    const currentDeleteButton = cardElement.querySelector(".element__bin-button");
    currentDeleteButton.addEventListener('click', function () {
        const elementItem = currentDeleteButton.closest(".element");
        elementItem.remove();
    });

    const likeButton = cardElement.querySelector(".element__heart");
    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__heart_liked');
    });
   
    const viewImage = cardElement.querySelector(".element__pic");
    viewImage.addEventListener('click', () => {
        largeImage.src = data.link;
        largeImageTitle.textContent = data.name;
        popupToggle(showImagePopup);
    });
    
    return cardElement;
}

initialCards.forEach((data) => {
    elements.append(createElement(data));
});


// обработка попапа 'добавить место'
const buttonOpenAddPlacePopup = document.querySelector(".add-but");
const addPlacePopup = document.querySelector("#add-place-popup");
const buttonCloseAddPlacePopup = document.querySelector("#add-place-popup-close-image");
const placeName = document.querySelector(".popup__field_type_place-name");
const placeLink = document.querySelector(".popup__field_type_place-link");
const formPlaceElement = document.querySelector("#add-place-container");

const formSubmitAddPlace = (evt) => {
    evt.preventDefault();
    let newElementData = {
        name: placeName.value,
        link: placeLink.value
    };
    const newElement = createElement(newElementData);

    elements.prepend(newElement);
    popupToggle(addPlacePopup);
    placeName.value = '';
    placeLink.value = '';
};

buttonOpenAddPlacePopup.addEventListener("click", () => popupToggle(addPlacePopup));
buttonCloseAddPlacePopup.addEventListener("click", () => popupToggle(addPlacePopup));
formPlaceElement.addEventListener('submit', formSubmitAddPlace);
const buttonCloseImagePopup = document.querySelector("#image-popup-close-button");
buttonCloseImagePopup.addEventListener("click", () => popupToggle(showImagePopup));
