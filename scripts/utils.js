const ESC_KEYCODE = 27;
// export const showImagePopup = document.querySelector('.popup__image-popup');


export const openPopup = (popup) => {
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', closeOnEscape);
}

export const closePopup = (popup) => {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(event) {
    if (event.keyCode === ESC_KEYCODE) {
       const openedPopup = document.querySelector('.popup_is-opened');
       closePopup(openedPopup);
    }
}