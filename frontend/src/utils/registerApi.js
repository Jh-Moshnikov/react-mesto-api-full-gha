 const BASE_URL = 'http://localhost:3001';

const getResponse = (res) => {
    if (res.ok) {
        return res.json()
    } return Promise.reject(`Ошибка ${res.status}`)
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(getResponse)
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(getResponse)
}

export const auth = () => {
    const token = localStorage.getItem("jwt");
    console.log('ткен фронта reg 39');
    console.log(token);
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`}
    })
        .then(getResponse)
}