export default function Card({ cards }) {
  return (
    <>
      {cards.map((card, i)=> (
        <div className="photo-grid__element" key={card._id}>
        <button className="photo-grid__bin" type="button"></button>
        <img className="photo-grid__photo" src={card.link} alt={card.name} />
        <div className="photo-grid__container">
          <h2 className="photo-grid__name">{card.name}</h2>
          <div className="photo-grid__like-container">
            <button className="photo-grid__like" type="button"></button>
            <p className="photo-grid__like-amount">{card.likes.length}</p>
          </div>
        </div>
      </div>
      ))}
    </>
  );
}
