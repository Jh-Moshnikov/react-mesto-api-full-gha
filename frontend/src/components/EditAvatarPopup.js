import React, { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const ref = useRef();


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: ref.current.value /* Значение инпута, полученное с помощью рефа */
        });
    }

    useEffect(() => {
        ref.current.value = ' ';
    }, [isOpen]);


    return (
        <PopupWithForm
            title={'Обновить аватар'}
            name={'changeUserAvatar'}
            btnText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__edit-form">
                <input id="cardLinkAva-input" type="url" name="avatar" placeholder="Ссылка на картинку" ref={ref} className="popup__edit popup__edit_submit-cardLink" required />
                <span className="popup__edit-error cardLinkAva-input-error"></span>
            </div>

        </PopupWithForm>
    );
};

export default EditAvatarPopup;