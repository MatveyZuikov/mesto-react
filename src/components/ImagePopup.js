export default function ImagePopup() {
  return (
    <div className="popup popup_type_full-photo">
      <div className="popup__photo">
        <button className="popup__close-btn" type="button"></button>
        <img className="popup__card-photo" src="/" alt="/" />
        <h2 className="popup__photo-title"></h2>
      </div>
    </div>
  );
}
