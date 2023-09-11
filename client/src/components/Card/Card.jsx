import { Link } from "react-router-dom";

import "./Card.css";

function Card({ game }) {
  const { id, name, genres, backgroundImage, rating } = game;
  const formattedGenres = genres.join(" ");

  return (
    <div className="card-container">
      <Link to={`/detail/${id}`}>
        <img src={backgroundImage} alt={name} />
      </Link>
      <h2>{name}</h2>
      <p>{rating}</p>
      <p>{formattedGenres}</p>
    </div>
  );
}

export default Card;
