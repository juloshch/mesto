export class Card {
    constructor(data, cardTemplate, handleCardClick, handleDeleteClick, userID) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._ownerID = this._data.owner._id;
        this._userID = userID;
    }

    // _handleDeleteCard = () => {
    //     this._cardElement.remove();
    //     this._cardElement = null;
    // };
    
    _handleLikeIcon = (evt) => {
        evt.target.classList.toggle('element__heart_liked');
    };

    _enableDelete = (cardElement) => {
        const currentDeleteButton = cardElement.querySelector("#bin-button");
        if (this._userID === this._ownerID) {
            const currentDeleteButton = cardElement.querySelector(".element__bin-button");
            currentDeleteButton.classList.remove('elememt__bin-button_hidden');
            currentDeleteButton.addEventListener('click', () => this._handleDeleteClick(this._data._id));
        }
    }


    createElement() {
        const cardElement = this._cardTemplate.content.cloneNode(true);
        const elementPic = cardElement.querySelector(".element__pic");
        elementPic.src = this._data.link;
        elementPic.alt = this._data.name;
        cardElement.querySelector(".element__title").textContent = this._data.name;
        // const currentDeleteButton = cardElement.querySelector(".element__bin-button");
        // currentDeleteButton.visible = false;
        // currentDeleteButton.addEventListener('click', () => this._handleDeleteClick(this._data.name));
        this._enableDelete(cardElement);
        const likeButton = cardElement.querySelector(".element__heart");
        likeButton.addEventListener('click', this._handleLikeIcon);
        elementPic.addEventListener('click', () => this._handleCardClick(this._data));
        cardElement.querySelector('.element__likes').textContent = this._data.likes.length;
        this._cardElement = cardElement.querySelector(".element"); 
        return this._cardElement;
    }
}
