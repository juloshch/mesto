import {openPopup, largeImage, largeImageTitle, showImagePopup} from './utils.js';

// класс карточки
export class Card {
    constructor(data, cardTemplate) {
        this._data = data;
        this._cardTemplate = cardTemplate;
    }

    _handleDeleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    };
    
    _handleLikeIcon = (evt) => {
        evt.target.classList.toggle('element__heart_liked');
    };
    
    _handleOpenCard = () => {
        largeImage.src = this._data.link;
        largeImage.alt = this._data.name;
        largeImageTitle.textContent = this._data.name;
        openPopup(showImagePopup);
    }

    createElement() {
        const cardElement = this._cardTemplate.content.cloneNode(true);
        const elementPic = cardElement.querySelector(".element__pic");
        elementPic.src = this._data.link;
        elementPic.alt = this._data.name;
        cardElement.querySelector(".element__title").textContent = this._data.name;
        const currentDeleteButton = cardElement.querySelector(".element__bin-button");
        currentDeleteButton.addEventListener('click', () => this._handleDeleteCard());
        const likeButton = cardElement.querySelector(".element__heart");
        likeButton.addEventListener('click', this._handleLikeIcon);
        elementPic.addEventListener('click', () => this._handleOpenCard());
        this._cardElement = cardElement.querySelector(".element"); 
        // почему-то когда я сохраняла в this._cardElement прямо document fragment и делала 
        // this._cardElement.querySelector(".element") в _handleDeleteCard я получала null
        return this._cardElement;
    }
}
