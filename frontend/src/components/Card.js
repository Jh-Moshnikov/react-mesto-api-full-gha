import React, { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

const hidden = {
    display: 'none'
}


function Card({ onCardClick, card, onCardLike, likesCount, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick} />
            <button type="button" className="element__delete-button" style={isOwn ? null : hidden} onClick={() => {
                onCardDelete(card)
            }}></button>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => {
                        onCardLike(card)
                    }}></button>
                    <p className="element__like-box">{likesCount}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;