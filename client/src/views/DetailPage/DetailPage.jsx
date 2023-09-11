import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../redux/actions/actions";
import Navbar from "../../components/Navbar/Navbar";

import "./DetailPage.css";

function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const game = useSelector((state) => state.filteredGames);

  useEffect(() => {
    dispatch(getVideogame(id));
  }, [dispatch]);

  const {
    name,
    backgroundImage,
    platforms,
    description,
    genres,
    rating,
    released,
  } = game;

  const tempElement = document.createElement("div");
  tempElement.innerHTML = description ? description : "";
  const textContent = tempElement.textContent || tempElement.innerText;

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="detail">
          <div className="name">
            {name ? <h2 className="home-title">{name}</h2> : <p></p>}
          </div>
          {backgroundImage ? (
            <img src={backgroundImage} alt="SUPUESTA_IMAGEN" />
          ) : null}
          <div className="details">
            <p>ID: {id}</p>
            {platforms ? <p>Platforms: {platforms.join(" - ")}</p> : null}
            {released ? <p>Release date: {released}</p> : <p></p>}
            {textContent ? <p className="description">{textContent}</p> : null}
            {rating ? <p>Rating: {rating}</p> : null}
            {genres ? <p>Genres: {genres.join(" - ")}</p> : null}
          </div>
        </div>
      </div>
      <Link to={"/home"}>
        <butto className="button">Atras</butto>
      </Link>
    </div>
  );
}

export default Detail;
