export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkedResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(this._url + 'users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => this._checkedResponse(res))
    }

    getAllCards() {
        return fetch(this._url + 'cards', {
            method: "GET",
            headers: this._headers
        })
            .then(res => this._checkedResponse(res))
    }

    updateUserInfo(info) {
        return fetch(this._url + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
        .then(res => this._checkedResponse(res))
    }

    postNewAvatar(info) {
        return fetch(this._url + 'users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: info.link
            })
        })
        .then(res => this._checkedResponse(res))
    }

    postNewCard(info) {
        return fetch(this._url + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                link: info.link
            })
        })
        .then(res => this._checkedResponse(res))
    }

    deleteCard(id) {
        return fetch(this._url + 'cards/' + id, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._checkedResponse(res))
    }

    like(id) {
        return fetch(this._url + 'cards/likes/' + id, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => this._checkedResponse(res))
    }

    removeLike(id) {
        return fetch(this._url + 'cards/likes/' + id, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => this._checkedResponse(res))
    }

    
}