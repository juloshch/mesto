import {openPopup, closePopup, largeImage, largeImageTitle, showImagePopup} from './script.js';

// класс карточки
export class Card {
    constructor(data, cardTemplate) {
        this._data = data;
        this._cardTemplate = cardTemplate;
    }

    _handleDeleteCard = (evt) => {
        const elementItem = evt.target.closest(".element");
        elementItem.remove();
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
        currentDeleteButton.addEventListener('click', this._handleDeleteCard);
        const likeButton = cardElement.querySelector(".element__heart");
        likeButton.addEventListener('click', this._handleLikeIcon);
        elementPic.addEventListener('click', () => this._handleOpenCard());
        return cardElement;
    }

    
}
