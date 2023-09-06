export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate>
          {props.children}
          <button
            className="popup__btn popup__btn_disabled"
            type="submit"
            disabled
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
