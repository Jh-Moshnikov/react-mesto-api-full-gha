import React from 'react';
import done from '../images/done.png';
import fail from '../images/fail.svg';
import {useLocation, useNavigate} from "react-router-dom";



  function InfoToolTip({ isOpen, onClose, isOk }) {
    
    return (
      <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__box">
        <button id="success-close-button" type="button" className="popup__close" onClick={onClose}/>
        <img className="popup__icon" src={`${isOk ? done : fail}`} alt="" />
        <h2 className="popup__text">{`${isOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
      </div>
    </div>
    )
  }
  

  
  export default InfoToolTip;