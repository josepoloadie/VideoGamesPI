import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogame } from "../../redux/actions/actions";

import "./DetailPage.css";

function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const game = useSelector((state) => state.allGames);

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
      <p>ID:{id}</p>
      {name ? <h1>{name}</h1> : <p></p>}
      {backgroundImage ? (
        <img src={backgroundImage} alt="SUPUESTA_IMAGEN" />
      ) : null}
      {platforms ? <p>{platforms.join(" ")}</p> : null}
      {released ? <p>{released}</p> : <p></p>}
      {textContent ? <p>{textContent}</p> : null}
      {rating ? <p>{rating}</p> : null}
      {genres ? <p>{genres.join(" ")}</p> : null}
      <Link to={"/home"}>
        <button>Atras</button>
      </Link>
    </div>
  );
}

export default Detail;
