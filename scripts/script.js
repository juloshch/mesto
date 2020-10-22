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

let buttonOpenPopup = document.querySelector(".edit-but");
let buttonClosePopup = document.querySelector(".popup__close-image");
let editProfilePopup = document.querySelector("#edit-profile-popup");
let captionName = document.querySelector(".caption__name");
let captionParagraph = document.querySelector(".captions__paragraph");
let popupFieldName = document.querySelector(".popup__field_type_name");
let popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
let formElement = document.querySelector("#edit-profile-container");

let popupToggle = (popup) => {
    popup.classList.toggle("popup_is-opened");
};

let openPopup = () => {
    popupFieldName.value = captionName.innerText;
    popupFieldParagraph.value = captionParagraph.innerText;
    popupToggle(editProfilePopup);
};

let formSubmitHandler = (evt) => {
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
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle("element__heart_liked");
    });
    return cardElement;
}

initialCards.forEach((data) => {
    elements.append(createElement(data));
});

// обработка попапа 'добавить место'
let buttonOpenAddPlacePopup = document.querySelector(".add-but");
let addPlacePopup = document.querySelector("#add-place-popup");
let buttonCloseAddPlacePopup = document.querySelector("#add-place-popup-close-image");
let placeName = document.querySelector(".popup__field_type_place-name");
let placeLink = document.querySelector(".popup__field_type_place-link");
let formPlaceElement = document.querySelector("#add-place-container");

let formSubmitAddPlace = (evt) => {
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

// удаление элемента

// const deleteButtons = document.querySelectorAll(".element__bin-button");
// deleteButtons.forEach((button) => {
//     button.addEventListener('click', function () {
//         const elementItem = button.closest(".element");
//         elementItem.remove();
//       });
// });
