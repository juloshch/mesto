export class Card {
    constructor(data, cardTemplate, handleCardClick) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _handleDeleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    };
    
    _handleLikeIcon = (evt) => {
        evt.target.classList.toggle('element__heart_liked');
    };

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
        elementPic.addEventListener('click', () => this._handleCardClick(this._data));
        this._cardElement = cardElement.querySelector(".element"); 
        return this._cardElement;
    }
}
