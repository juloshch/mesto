export class Card {
    constructor(data, cardTemplate, handleCardClick, handleDeleteClick, userID, sendLike, sendUnlike) {
        this._data = data;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._ownerID = this._data.owner._id;
        this._userID = userID;
        this._isLiked = false;
        this._sendLike = sendLike.bind(this);
        this._sendUnlike = sendUnlike.bind(this);
        this._createElement();
        this.processLikes(data.likes, userID);
    }

    processLikes = (likes) => {
        const newIsLiked = likes.some(l => this._userID === l._id);
        if (newIsLiked !== this._isLiked) {
            this._isLiked = newIsLiked;
            this._cardElement.querySelector('.element__heart').classList.toggle('element__heart_liked');
        }
        this._likesCount = likes.length;
        this.setLikesCount(this._likesCount);
    }
    
    _handleLikeIcon = () => {
        if (!this._isLiked) {
            this._sendLike(this._data._id);
        }
        else {
            this._sendUnlike(this._data._id);
        }
    };

    _enableDelete = (cardElement) => {
        if (this._userID === this._ownerID) {
            const currentDeleteButton = cardElement.querySelector(".element__bin-button");
            currentDeleteButton.classList.remove('elememt__bin-button_hidden');
            currentDeleteButton.addEventListener('click', () => this._handleDeleteClick(this, this._data._id));
        }
    }

    setLikesCount = (count) => {
        if (this._cardElement) {
            this._cardElement.querySelector('.element__likes').textContent = count;
        }
    }

    remove() {
        this._cardElement.remove();
    }

    _createElement() {
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
        this._cardElement.id = this._data._id;
    }

    createElement() {
        return this._cardElement;
    }
}
