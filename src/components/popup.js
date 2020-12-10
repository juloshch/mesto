const ESC_KEYCODE = 27;

export class Popup {
    constructor(popupSelector, closeButtonSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._buttonClosePopup = this._popup.querySelector(closeButtonSelector);
    }

    open() {
        this._popup.classList.add("popup_is-opened");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove("popup_is-opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.keyCode === ESC_KEYCODE) {
            this.close();
        }
    }
    
    closeOnBackground(event) {
        if (event.target !== event.currentTarget) {
            return;
        }
        this.close();
    };

    setEventListeners() {
        this._buttonClosePopup.addEventListener("click", () => this.close());
        this._popup.addEventListener('click', (evt) => this.closeOnBackground(evt));
    }
}