import headerLogo from '../images/hrader_logo.svg';
import { Link, Route, Routes, useNavigate, useLocation, NavLink } from "react-router-dom";
import React, { useState } from 'react';


function Header({ email, logout }) {

  const navigate = useNavigate();


  return (
    <header className="header">
      <img src={headerLogo} alt="место" className="header__logo" />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{email}</p>
              <button className="header__button" onClick={logout}>
                Выход
              </button>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <button
              className="header__button"
              onClick={() => navigate("/sign-in", { replace: true })}
            >
              Вход
            </button>
          }
        />
        <Route
          path="sign-in"
          element={
            <button
              className="header__button"
              onClick={() => navigate("/sign-up", { replace: true })}
            >
              Регистрация
            </button>
          }
        />
      </Routes>

    </header>
  )
};

export default Header;
