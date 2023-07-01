import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import InfoToolTip from "./InfoToolTip";

const Register = ({ handleRegister, isLoggedIn, isOpen, isOk, onClose }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(email, password);
    }

    useEffect(() => {
        if (isLoggedIn) {
            setEmail("");
            setPassword("");
        }
    }, [isLoggedIn]);


    return (
        <div>
            <div className='register'>
                <h2 className='register__title'>Регистрация</h2>
                <form className='register__form' noValidate onSubmit={handleSubmit}>
                    <input name="email" type="email" className='register__input' placeholder='E-mail' value={email || ''} onChange={handleChangeEmail}></input>
                    <input name="password" type="password" className='register__input' placeholder='Пароль' value={password || ''} onChange={handleChangePassword}></input>
                    <button type="submit" className="register__button">Зарегистрироваться</button>
                </form>
                <p className='register__text'>Уже зарегистрированы? <Link to='/sign-in' className='register__text'>Войти</Link></p>
            </div>
            
        </div>
    );
};

export default Register;