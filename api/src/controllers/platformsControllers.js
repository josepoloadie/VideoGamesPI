const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getPlatformsAPI = async () => {
  const URL = `https://api.rawg.io/api/platforms?key=${API_KEY}`;
  const Platforms = [];
  console.log(URL);
  try {
    const response = await axios(URL);

    const results = response.data.results;

    results.map((platform) => {
      const nuevoObjeto = {
        id: platform.id,
        name: platform.name,
      };

      Platforms.push(nuevoObjeto);
    });

    return Platforms;
  } catch (error) {
    throw new Error("Error al obtener los juegos de la API");
  }
};

module.exports = { getPlatformsAPI };
