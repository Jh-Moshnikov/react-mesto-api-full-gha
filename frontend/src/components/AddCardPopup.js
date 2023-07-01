import React, { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";


function AddCardPopup({ isOpen, onClose, onAddCard }) {

    const [cardName, setCardName] = useState(' ');
    const [link, setLink] = useState(' ');

    const handleChangeName = (e) => {
        setCardName(e.target.value);
    };

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    };

    const handleSubmitCard = (e) => {
        e.preventDefault();

        onAddCard({
            name: cardName,
            link: link
        });
        console.log(cardName);

    }

    useEffect(() => {
        if (isOpen) {
            setCardName("");
            setLink("");
        }
    }, [isOpen]);


    return (
        <PopupWithForm
            title={'Новое место'}
            name={'submitCard'}
            btnText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onAddCard={onAddCard}
            onSubmit={handleSubmitCard}
        >
            <div className="popup__edit-form">
                <input id="cardName-input" type="text" name="name" placeholder="Название" value={cardName || ''} onChange={handleChangeName} className="popup__edit popup__edit_submit-cardName" minLength="2" maxLength="30" required />
                <span className="popup__edit-error cardName-input-error"></span>
                <input id="cardLink-input" type="url" name="link" placeholder="Ссылка на картинку" value={link || ''} onChange={handleChangeLink} className="popup__edit popup__edit_submit-cardLink" required />
                <span className="popup__edit-error cardLink-input-error"></span>
            </div>

        </PopupWithForm>
    );
};

export default AddCardPopup;