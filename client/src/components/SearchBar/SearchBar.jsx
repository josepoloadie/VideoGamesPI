import "./SearchBar.css";

import { useState } from "react";
import {
  getVideogamesByName,
  getVideogames,
  filterGames,
  orderGame,
} from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
function SearchBar({ allGenres }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const dispatch = useDispatch();

  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evitar la recarga de la página por defecto
    dispatch(getVideogamesByName(searchValue));
  };

  const handleListAll = () => {
    // Llama a la acción para listar todos los videojuegos utilizando dispatch
    dispatch(getVideogames());
  };

  const handleListAPI = () => {
    dispatch(filterGames("API"));
  };
  const handleListBD = () => {
    dispatch(filterGames("BD"));
  };

  const handleListAscendant = () => {
    dispatch(orderGame("A"));
  };
  const handleListDescendant = () => {
    dispatch(orderGame("B"));
  };

  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    // Realiza acciones basadas en la opción seleccionada
    console.log(`Opción seleccionada: ${selectedValue}`);
    setSelectedGenre(selectedValue);
    dispatch(filterGames(selectedValue));
  };

  return (
    <div className="search-box">
      <button className="button" onClick={handleListAll}>
        Listar Todo
      </button>
      <button className="button" onClick={handleListAPI}>
        API
      </button>
      <button className="button" onClick={handleListBD}>
        BD
      </button>
      <button className="button" onClick={handleListAscendant}>
        A...Z
      </button>
      <button className="button" onClick={handleListDescendant}>
        Z...A
      </button>
      {allGenres ? (
        <select onChange={handleSelectChange} value={selectedGenre}>
          <option value={"SinFiltrar"}>Filtrar por genero...</option>
          {/* Mapea el array y crea opciones */}
          {allGenres.map((opcion, index) => (
            <option key={index} value={opcion.name}>
              {opcion.name}
            </option>
          ))}
        </select>
      ) : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchValue}
          onChange={handleInputChange}
        />
        <button className="button" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
