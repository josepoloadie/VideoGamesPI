// const { videogame, genre } = require("../db");
// const axios = require("axios");
// require("dotenv").config(); //Se requiere el archivo .env
// const { API_KEY } = process.env;

// const createGenreBD = async (Genre) => {
//   const { id, name } = Genre;
//   if (!name) {
//     throw new Error("Datos invalidos");
//   } else {
//     const newGenre = await genre.create({ id, name });
//     return newGenre;
//   }
// };

// const getGenreAPI = async () => {
//   const generos = await axios.get(
//     `https://api.rawg.io/api/genres?key=${API_KEY}`
//   );
//   const resultados = generos.data.results;
//   await genre.destroy({ where: {} });
//   resultados.sort((a, b) => a.id - b.id);
//   const newGenres = await genre.bulkCreate(resultados);
//   return newGenres.sort((a, b) => a.name.localeCompare(b.name));
// };

// module.exports = { createGenreBD, getGenreAPI };

const axios = require("axios");
const { genre } = require("../db");
require("dotenv").config();

const { API_KEY } = process.env;

const createGenreBD = async (Genre) => {
  const { name } = Genre;
  if (!name) {
    throw new Error("Datos inválidos");
  }

  const newGenre = await genre.create({ name });
  return newGenre;
};

const getGenreAPI = async () => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );

    const results = response.data.results;

    await genre.destroy({ truncate: true }); // Borrar todos los registros en bloque

    const newGenres = await genre.bulkCreate(results);

    return newGenres.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    throw new Error("Error al obtener los géneros de la API");
  }
};

module.exports = { createGenreBD, getGenreAPI };
