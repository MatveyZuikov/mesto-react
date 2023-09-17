import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
  const avatar = React.useRef();
  const [value, setValue] = React.useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(avatar);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      title={"Обновить аватар"}
      //   onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_title_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatar}
        value={value}
        onChange={handleChange}
      />
      <span className="popup__input-error popup__input-error_title_avatar"></span>
    </PopupWithForm>
  );
}
