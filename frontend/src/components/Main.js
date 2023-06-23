import React, { useEffect, useState, useContext } from 'react';
import Card from "./Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {

    const profileContext = useContext(CurrentUserContext);
   
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-image">
                    <img src={profileContext.avatar} alt="фотография профиля" className="profile__avatar" onClick={onEditAvatar} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{profileContext.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                    <p className="profile__occupation">{profileContext.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <ul className="elements">
                {cards.map((card) => (
                    <Card
                        onCardClick={onCardClick}
                        card={card}
                        key={card._id}
                        onCardLike={onCardLike}
                        likesCount={card.likes.length}
                        onCardDelete={onCardDelete}

                    />
                ))}
            </ul>
        </main>
    )
};

export default Main;