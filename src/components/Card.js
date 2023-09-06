export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <>
      <div className="photo-grid__element" key={props.card._id}>
        <button className="photo-grid__bin" type="button"></button>
        <img
          className="photo-grid__photo"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleClick}
        />
        <div className="photo-grid__container">
          <h2 className="photo-grid__name">{props.card.name}</h2>
          <div className="photo-grid__like-container">
            <button className="photo-grid__like" type="button"></button>
            <p className="photo-grid__like-amount">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}
