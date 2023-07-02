 const BASE_URL = 'http://localhost:3001';

const getResponse = (res) => {
    if (res.ok) {
        console.log('регистр апи 4');
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

export const auth = (token) => {
   // const token = localStorage.getItem("jwt");
    console.log('ткен фронта reg 39');
    // eslint-disable-next-line no-sequences
    return console.log('регистр аип 40'), fetch('http://localhost:3001/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}
    })
        .then(getResponse)
}