import { Link } from "react-router-dom";

import "./Card.css";

function Card({ game }) {
  const { id, name, genres, backgroundImage } = game;
  const formattedGenres = genres.join(" ");
  return (
    <div className="card-container">
      <Link to={`/detail/${id}`}>
        <img src={backgroundImage} alt="AQUI VA LA SUPUESTA IMAGEN" />
      </Link>
      <h2>{name}</h2>
      <p>Generos: {formattedGenres}</p>
    </div>
  );
}

export default Card;
