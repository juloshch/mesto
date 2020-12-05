const ESC_KEYCODE = 27;

export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose.bind(this)
    }
    
    // function closeOnEscape(event) {
    //     if (event.keyCode === 27) {
    //        const openedPopup = document.querySelector('.popup_is-opened');
    //        closePopup(openedPopup);
    //     }
    // }

    open() {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener('keydown', this._handleEscClose.(this));
    }

    close() {
        this._popup.classList.remove("popup_is-opened");
        document.removeEventListener('keydown', this._handleEscClose.(this));
    }

    _handleEscClose(event) {
        if (event.keyCode === ESC_KEYCODE) {
            const openedPopup = document.querySelector('.popup_is-opened');
            closePopup(openedPopup);
         }
    }

    setEventListeners() {

    }
}