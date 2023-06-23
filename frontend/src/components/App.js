import { useEffect, useState } from "react";
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CurrentUserContext from "../context/CurrentUserContext";
import { api } from "../utils/Api";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import { register, login, auth } from '../utils/registerApi';
import InfoToolTip from "./InfoToolTip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  /* const [error, setError] = useState(''); для будущей реализации сообщений об ошибке */
  const navigate = useNavigate();





  const handleRegister = async (email, password) => {
    try {
      await register(email, password)
      setIsOk(true);
      setIsInfoToolTipOpen(true);
      navigate("/sign-in");
    } catch (e) {
      console.warn(e);
      setIsOk(false);
      setIsInfoToolTipOpen(true);
      /* setError(e.error);*/
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const { token } = await login(email, password);
      const { data } = await auth(token);
      setUserEmail(data.email);
      setIsLoggedIn(true);
      localStorage.setItem('token', token);
      navigate("/");
    } catch (e) {
      console.warn(e);
      setIsOk(false);
      setIsInfoToolTipOpen(true);
      /* setError(e);*/
    }
  }


  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await auth(token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate("/");
      } catch (e) {
        console.warn(e);
        setIsLoggedIn(false);
      }
    }
  };


  useEffect(() => {
    checkToken();

  }, [])





  const logout = () => {
    localStorage.removeItem('token');
    setUserEmail('');
    setIsLoggedIn(false);
  }



  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (obj) => {
    setIsImagePopupOpen(true);
    setSelectedCard(obj);
  }

  const closeAllPopups = () => {
    setIsInfoToolTipOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch((err) => console.warn(err));
  }, [])


  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    try {
      const resChangeLikeStatus = await api.changeLikeCardStatus(card, !isLiked);
      setCards((state) => state.map((c) => c._id === card._id ? resChangeLikeStatus : c));
    } catch (error) {
      console.warn(error);
    }
  }

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((newCardsArray) => newCardsArray.filter((item) => card._id !== item._id))
      closeAllPopups();
    } catch (error) {
      console.warn(error);
    }
  }

  const handleUpdateUser = async (obj) => {
    try {
      const changedProfile = await api.setUserInfo(obj);
      setCurrentUser(changedProfile);
      closeAllPopups();
    } catch (e) {
      console.warn(e)
    }
  }

  const handleUpdateAvatar = async (obj) => {
    try {
      const changeAvatar = await api.changeAvatar(obj);
      setCurrentUser(changeAvatar);
      closeAllPopups();
    } catch (e) {
      console.warn(e)
    }
  }

  const handleAddPlaceSubmit = async (obj) => {
    try {
      const newCard = await api.addNewCard(obj);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.warn(e)
    }
  }



  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);

      })
      .catch((err) => console.warn(err));
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={userEmail} logout={logout} />
          <Routes>
            <Route path='/'
              element={
                <ProtectedRoute
                  Component={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                />} />
            <Route path='/sign-up'
              element={<Register
                handleRegister={handleRegister}
                isOpen={isInfoToolTipOpen}
                isLoggedIn={isLoggedIn}
                isOk={isOk}
                onClose={closeAllPopups}
              />
              } />
            <Route path='/sign-in'
              element={<Login
                handleLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                isOpen={isInfoToolTipOpen}
                isOk={isOk}
                onClose={closeAllPopups}
              />
              } />
          </Routes>
          <Footer />
          <InfoToolTip
            isOk={isOk}
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
          /*error={error}*/ />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
