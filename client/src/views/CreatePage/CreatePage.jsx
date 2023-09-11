import { useEffect, useState } from "react";
import "./CreatePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getPlatforms } from "../../redux/actions/actions";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const validate = (formData, setErrors, errors) => {
  if (!formData.name) {
    setErrors({ ...errors, name: "Nombre vacio" });
  } else if (!formData.genres.length === 0) {
    setErrors({ ...errors, genres: "Debes escoger al menos 1 genero" });
  }
};

function CreatePage() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const allPlatforms = useSelector((state) => state.allPlatforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platforms: [],
    backgroundImage: "",
    released: "",
    rating: "",
    genres: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: [],
    backgroundImage: "",
    released: "",
    rating: "",
    genres: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGeneroChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      genres: [...formData.genres, value],
    });
  };

  const handlePlatformChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      platforms: [...formData.platforms, value],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = {};
    for (const key in formData) {
      if (
        formData[key] === "" ||
        (Array.isArray(formData[key]) && formData[key].length === 0)
      ) {
        validationErrors[key] = "Este campo es requerido.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/videogames",
          formData
        );

        alert("JUEGO CREADO");

        // Limpia el estado del formulario después de enviar los datos
        setFormData({
          name: "",
          description: "",
          platforms: [],
          backgroundImage: "",
          released: "",
          rating: "",
          genres: [],
        });
      } catch (error) {
        // Manejar errores de la solicitud
        console.error("Error al enviar los datos:", error.response.data);
      }
    }
  };

  return (
    <div>
      <p className="home-title">FORM PAGE</p>

      <Navbar />
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            className="text"
            type="text"
            name="name"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <span>{errors.name}</span>
        </div>
        <div>
          <label>Imagen:</label>
          <input
            className="text"
            type="text"
            name="backgroundImage"
            value={formData.backgroundImage}
            onChange={handleInputChange}
          />
          <span>{errors.backgroundImage}</span>
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <span>{errors.description}</span>
        </div>
        <div>
          <label>Plataformas:</label>
          <select
            multiple
            name="platforms"
            value={formData.platforms}
            onChange={handlePlatformChange}
          >
            {allPlatforms.map((opcion, index) => (
              <option key={index} value={opcion.name}>
                {opcion.name}
              </option>
            ))}
          </select>
          <span>{errors.platforms}</span>
        </div>
        <div>
          <label>Fecha de Lanzamiento:</label>
          <input
            type="date"
            name="released"
            value={formData.released}
            onChange={handleInputChange}
          />
          <span>{errors.released}</span>
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
          <span>{errors.rating}</span>
        </div>
        <div>
          <label>Géneros:</label>
          <select
            multiple
            name="genres"
            value={formData.genres}
            onChange={handleGeneroChange}
          >
            {allGenres.map((opcion, index) => (
              <option key={index} value={opcion.id}>
                {opcion.name}
              </option>
            ))}
          </select>
          <span>{errors.genres}</span>
        </div>
        <div>
          <button className="button" type="submit">
            Crear Videojuego
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePage;
