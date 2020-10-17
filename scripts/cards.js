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

function createElement(data) {
    const element = '<article class="element">' +
            '<img src="' + data.link + '" class="element__pic" alt="' + data.name + '">' +
            '<div class="element__caption">' +
                '<h2 class="element__title">' + data.name + '</h2>' +
                '<button class="element__heart" type="button">' +
                    '<img src="./images/heart.svg" alt="сердечко">' +
                '</button>' +
            '</div>' +
        '</article>';
    return element;
}

function renderElements(cards) {
    let elementsBody = '';
    for (let i = 0; i < cards.length; i++) {
        let elementData = cards[i];
        const el = createElement(elementData);       
        elementsBody = elementsBody + el; 
    }

    let elements = document.querySelector(".elements");
    elements.innerHTML = elementsBody;
}

renderElements(initialCards);

// обработка попапа
let buttonOpenAddPlacePopup = document.querySelector(".add-but");
let addPlacePopup = document.querySelector("#add-place-popup");
let buttonCloseAddPlacePopup = document.querySelector("#add-place-popup-close-image");
let placeName = document.querySelector(".popup__field_type_place-name");
let placeLink = document.querySelector(".popup__field_type_place-link");
let formPlaceElement = document.querySelector("#add-place-container");

let addPlacePopupToggle = () => {
    addPlacePopup.classList.toggle("popup_is-opened");
};

let formSubmitAddPlace = (evt) => {
    evt.preventDefault();
    let newElementData = {
        name: placeName.value,
        link: placeLink.value
    };
    initialCards.unshift(newElementData);
    renderElements(initialCards);
    addPlacePopupToggle();
};

buttonOpenAddPlacePopup.addEventListener("click", addPlacePopupToggle);
buttonCloseAddPlacePopup.addEventListener("click", addPlacePopupToggle);
formPlaceElement.addEventListener('submit', formSubmitAddPlace);
