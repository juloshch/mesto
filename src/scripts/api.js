export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getUserInfo() {
        return fetch(this._url + 'users/me', {
            method: 'GET',
            headers: this._headers
        })
            .then(res => res.json())
    }

    getAllCards() {
        return fetch(this._url + 'cards', {
            method: "GET",
            headers: this._headers
        })
            .then(res => res.json())
    }

    updateUserInfo(info) {
        return fetch(this._url + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        });
    }

    postNewCard(info) {
        return fetch(this._url + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                link: info.link
            })
        });
    }

    deleteCard(id) {
        // console.log('deleted id: ' + id);
        return fetch(this._url + 'cards/' + id, {
            method: 'DELETE',
            headers: this._headers,
        });
    }

    // changeAvatar() {
    //     return fetch(this._url + 'users/me/' + avatar, {
    //         method: 'PATCH',
    //         headers: this._headers,
    //     })
    // }
}