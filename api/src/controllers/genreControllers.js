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
    const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
    const response = await axios.get(URL);

    const results = response.data.results;

    const videogames = await genre.findAll();
    if (videogames.length === 0) {
      const newGenres = await genre.bulkCreate(results);
      console.log("CREE LOS REGISTROS");
      return newGenres;
    }
    console.log("YA LOS REGISTROS ESTABAN CREADOS");
    return videogames;
  } catch (error) {
    throw new Error("Error al obtener los géneros de la API");
  }
};

module.exports = { createGenreBD, getGenreAPI };
