import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .changeUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const cardsArray = cards.filter((c) =>
        c._id === card._id ? false : true
      );
      setCards(cardsArray);
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onCLose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

{
  /* <PopupWithForm/>
      <PopupWithForm/>
      <PopupWithForm/> */
}
{
  /* <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form className="popup__form" name="profile" novalidate>
            <input
              className="popup__input popup__input_title_name"
              type="text"
              name="name"
              placeholder="Имя"
              required
              minlength="2"
              maxlength="40"
            />
            <span className="popup__input-error popup__input-error_title_name"></span>
            <input
              className="popup__input popup__input_title_job"
              type="text"
              name="job"
              placeholder="О себе"
              required
              minlength="2"
              maxlength="200"
            />
            <span className="popup__input-error popup__input-error_title_job"></span>
            <button className="popup__btn" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div> */
}
{
  /* <div className="popup popup_type_deletion-confirmation">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__title popup__title_type_confirmation">
            Вы уверены?
          </h2>
          <form className="popup__form" name="profile" novalidate>
            <button className="popup__btn" type="submit">
              Да
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_avatar-update">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__title ">Обновить аватар</h2>
          <form className="popup__form" name="avatar" novalidate>
            <input
              className="popup__input popup__input_title_avatar"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error popup__input-error_title_avatar"></span>
            <button class="popup__btn popup__btn_disabled" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_add-card">
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <h2 className="popup__title">Новое место</h2>
          <form className="popup__form" name="place" novalidate>
            <input
              className="popup__input popup__input_title_place"
              type="text"
              name="place"
              placeholder="Название"
              required
              minlength="2"
              maxlength="30"
            />
            <span className="popup__input-error popup__input-error_title_place"></span>
            <input
              className="popup__input popup__input_title_link"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error popup__input-error_title_link"></span>
            <button
              className="popup__btn popup__btn_disabled"
              type="submit"
              disabled
            >
              Создать
            </button>
          </form>
        </div>
      </div> */
}
{
  /* <div className="popup popup_type_full-photo">
        <div className="popup__photo">
          <button className="popup__close-btn" type="button"></button>
          <img className="popup__card-photo" src="/" alt="/" />
          <h2 className="popup__photo-title"></h2>
        </div>
      </div> */
}
{
  /* <template className="photo-grid__template">
        <div className="photo-grid__element">
          <button className="photo-grid__bin" type="button"></button>
          <img className="photo-grid__photo" src="/" alt="/" />
          <div className="photo-grid__container">
            <h2 className="photo-grid__name"></h2>
            <div className="photo-grid__like-container">
              <button className="photo-grid__like" type="button"></button>
              <p className="photo-grid__like-amount"></p>
            </div>
          </div>
        </div>
      </template> */
}
