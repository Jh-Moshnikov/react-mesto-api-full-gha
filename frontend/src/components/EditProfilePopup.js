import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(' ');
    const [description, setDescription] = useState(' ');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    };

    const handleChangeDiscription = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title={'Редактировать профиль'}
            name={'profile'}
            btnText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__edit-form">
                <input id="name-input" type="text" name="name" placeholder="Имя" value={name || ''} onChange={handleChangeName} className="popup__edit popup__edit_change_name" minLength="2" maxLength="40" required />
                <span className="popup__edit-error name-input-error"></span>
                <input id="occupation-input" type="text" name="about" placeholder="О себе" value={description || ''} onChange={handleChangeDiscription} className="popup__edit popup__edit_change_occupation" minLength="2" maxLength="200" required />
                <span className="popup__edit-error occupation-input-error"></span>
            </div>

        </PopupWithForm>
    );
};

export default EditProfilePopup;