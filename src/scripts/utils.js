const ESC_KEYCODE = 27;

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
