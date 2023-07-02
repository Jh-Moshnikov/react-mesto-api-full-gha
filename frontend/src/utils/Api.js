class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
           // method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
            .then(this._getResponse); //async, который использую в script.js, является надстройкой над промисами, то  можем смешивать код

    }

    getInitialCards() {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
          //  method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }).then(this._getResponse);
    }

    setUserInfo(user) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: user.name,
                about: user.about
            }),
        }).then(this._getResponse)
    }



    addNewCard(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }).then(this._getResponse);
    }

    deleteCard(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }).then(this._getResponse);
    }

    changeAvatar(data) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._getResponse);
    }

    like(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }).then(this._getResponse);
    }

    deletelike(id) {
        const token = localStorage.getItem("token");
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }).then(this._getResponse);
    }

    changeLikeCardStatus(obj, variable) {
        this._status = variable ? this.like(obj._id) : this.deletelike(obj._id);
        return this._status;
    }

}

export const api = new Api({
    baseUrl: "http://localhost:3001",
})