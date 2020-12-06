import {Popup} from './popup.js';

export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._captionName = document.querySelector(nameSelector);
        this._captionParagraph = document.querySelector(infoSelector);
    }

    getUserInfo() {
        const userInfoData = {
            name: this._captionName.textContent,
            paragraph: this._captionParagraph.textContent
        }
        return userInfoData;
    }

    setUserInfo(data) {
        this._captionName.textContent = data.name;
        this._captionParagraph.textContent = data.paragraph;
    }
}