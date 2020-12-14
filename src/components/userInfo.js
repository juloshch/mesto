export class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._captionName = document.querySelector(nameSelector);
        this._captionParagraph = document.querySelector(infoSelector);
        this._avatarImage = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInfoData = {
            name: this._captionName.textContent,
            about: this._captionParagraph.textContent
        }
        return userInfoData;
    }

    setUserInfo(data) {
        this._captionName.textContent = data.name;
        this._captionParagraph.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatarImage.src = data.link;
    }
}