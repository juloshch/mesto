export class Card {
    constructor(data, cardTemplate, handleCardClick, handleDeleteClick, userID, sendLike, sendUnlike) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._ownerID = this._data.owner._id;
        this._userID = userID;
        this._isLiked = data.likes.some(l => userID === l._id);
        this._sendLike = sendLike;
        this._sendUnlike = sendUnlike;
        this._likesCount = this._data.likes.length;
    }
    
    _handleLikeIcon = (evt) => {
        evt.target.classList.toggle('element__heart_liked');
        this._isLiked = !this._isLiked;
        if (this._isLiked) {
            this._likesCount++;
            this.setLikesCount(this._likesCount);
            this._sendLike(this._data._id);
        }
        else {
            this._likesCount--;
            this.setLikesCount(this._likesCount);
            this._sendUnlike(this._data._id);
        }
    };

    _enableDelete = (cardElement) => {
        const currentDeleteButton = cardElement.querySelector("#bin-button");
        if (this._userID === this._ownerID) {
            const currentDeleteButton = cardElement.querySelector(".element__bin-button");
            currentDeleteButton.classList.remove('elememt__bin-button_hidden');
            currentDeleteButton.addEventListener('click', () => this._handleDeleteClick(this._data._id));
        }
    }

    setLikesCount = (count) => {
        if (this._cardElement) {
            this._cardElement.querySelector('.element__likes').textContent = count;
        }
    }

    createElement() {
        const cardElement = this._cardTemplate.content.cloneNode(true);
        const elementPic = cardElement.querySelector(".element__pic");
        elementPic.src = this._data.link;
        elementPic.alt = this._data.name;
        cardElement.querySelector(".element__title").textContent = this._data.name;
        this._enableDelete(cardElement);
        const likeButton = cardElement.querySelector(".element__heart");
        likeButton.addEventListener('click', this._handleLikeIcon.bind(this));
        elementPic.addEventListener('click', () => this._handleCardClick(this._data));       
        this._cardElement = cardElement.querySelector(".element");
        this.setLikesCount(this._data.likes.length);
        if (this._isLiked) {
            this._cardElement.querySelector('.element__heart').classList.toggle('element__heart_liked');
        }
        return this._cardElement;
    }
}
