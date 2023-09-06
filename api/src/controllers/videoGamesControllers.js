const axios = require("axios");
const { videogame, genre } = require("../db");
require("dotenv").config();

const { API_KEY } = process.env;

const getVideogamesAPI = async () => {
  const GamesAPI = [];

  try {
    const pagePromises = Array.from({ length: 5 }, (_, page) =>
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page + 1}`)
    );

    const pageResponses = await Promise.all(pagePromises);

    for (const response of pageResponses) {
      const resultados = response.data.results;

      for (const objeto of resultados) {
        const plataforma = objeto.platforms.map((a) => a.platform.name);
        const generos = objeto.genres.map((a) => a.name);

        const nuevoObjeto = {
          id: objeto.id,
          name: objeto.name,
          platforms: plataforma,
          backgroundImage: objeto.background_image,
          released: objeto.released,
          rating: objeto.rating,
          genres: generos,
          origin: "API",
        };

        GamesAPI.push(nuevoObjeto);
      }
    }
  } catch (error) {
    throw new Error("Error al obtener los juegos de la API");
  }

  return GamesAPI;
};

const getVideogamesBD = async () => {
  const videogamesBD = [];
  const videogames = await videogame.findAll({
    include: {
      model: genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  for (const game of videogames) {
    game.dataValues.genres = game.genres.map((a) => a.name);
    game.dataValues.origin = "BD";
  }

  videogames.map((game) => {
    videogamesBD.push(game.dataValues);
  });

  return videogamesBD;
};

const getAllVideogames = async (query) => {
  const API = await getVideogamesAPI();
  const BD = await getVideogamesBD();

  const allGames = [...BD, ...API];

  if (!query.name) {
    return allGames;
  }

  const filtered = allGames.filter((game) =>
    game.name.toLowerCase().includes(query.name.toLowerCase())
  );

  return filtered.slice(0, 15);
};

const getDetailVideogameByID = async (id) => {
  if (isNaN(id)) {
    const game = await videogame.findByPk(id, {
      include: {
        model: genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const generos = game.genres.map((a) => a.name);

    return {
      ...game.dataValues,
      genres: generos,
      origin: "BD",
    };
  } else {
    const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    const response = await axios.get(url);

    const plataforma = response.data.platforms.map((a) => a.platform.name);
    const generos = response.data.genres.map((a) => a.name);

    return {
      id: response.data.id,
      name: response.data.name,
      backgroundImage: response.data.background_image,
      platforms: plataforma,
      description: response.data.description,
      released: response.data.released,
      rating: response.data.rating,
      genres: generos,
      origin: "API",
    };
  }
};

const createVideogameDB = async (game) => {
  const {
    name,
    description,
    platforms,
    backgroundImage,
    released,
    rating,
    genres,
  } = game;

  if (!name) {
    throw new Error("Datos inválidos");
  }

  const newGame = await videogame.create({
    name,
    description,
    platforms,
    backgroundImage,
    released,
    rating,
  });

  await newGame.addGenres(genres);

  return newGame;
};

module.exports = {
  createVideogameDB,
  getDetailVideogameByID,
  getVideogamesAPI,
  getVideogamesBD,
  getAllVideogames,
};

// const { videogame, genre } = require("../db");
// const axios = require("axios");
// require("dotenv").config(); //Se requiere el archivo .env
// const { API_KEY } = process.env;

// const getVideogamesAPI = async () => {
//   const pagePromises = [];
//   const GamesAPI = [];
// for (let page = 1; page <= 6; page++) {
//   const url = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;
//   pagePromises.push(axios.get(url));
// }
//   const pageResponses = await Promise.all(pagePromises);

//   pageResponses.map((response) => {
//     resultados = response.data.results;
//     resultados.forEach(function (objeto) {
//       const plataforma = [];

//       objeto.platforms.map((a) => {
//         plataforma.push(a.platform.name);
//       });

//       const generos = [];
//       objeto.genres.map((a) => {
//         generos.push(a.name);
//       });
//       var nuevoObjeto = {
//         id: objeto.id,
//         name: objeto.name,
//         platforms: plataforma,
//         backgroundImage: objeto.background_image,
//         released: objeto.released,
//         rating: objeto.rating,
//         genres: generos,
//       };
//       GamesAPI.push(nuevoObjeto);
//     });
//   });
//   return GamesAPI;
// };

// const getVideogamesBD = async () => {
//   const videogames = await videogame.findAll({
//     include: {
//       model: genre,
//       attributes: ["name"],
//       through: { attributes: [] },
//     },
//   });

//   if (videogames.length > 0) {
//     for (let i = 0; i < videogames.length; i++) {
//       const generos = [];
//       videogames[i].dataValues.genres.map((a) => {
//         generos.push(a.name);
//       });

//       videogames[i].dataValues.genres.splice(
//         0,
//         videogames[i].dataValues.genres.length
//       );
//       generos.map((a) => {
//         videogames[i].genres.push(a);
//       });
//     }

//     console.log(videogames);
//     return videogames;
//   }
// };

// const getAllVideogames = async (query) => {
//   const allGames = [];
//   const filtered = [];
//   const aux = [];
//   console.log(query);

//   const API = await getVideogamesAPI();

//   const BD = await getVideogamesBD();

//   if (BD) {
//     for (let i = 0; i < BD.length; i++) {
//       allGames.push(BD[i].dataValues);
//     }
//   }
//   API.map((a) => {
//     allGames.push(a);
//   });

//   if (query.name === undefined) {
//     return allGames;
//   } else {
//     allGames.map((a) => {
//       let string = a.name.toLowerCase();
//       if (string.includes(query.name.toLowerCase())) {
//         filtered.push(a);
//       }
//     });

//     if (filtered.length == 0) {
//       return filtered;
//     } else {
//       let acum = 0;
//       while (acum < 15) {
//         console.log(filtered[acum]);
//         if (filtered[acum] != null) {
//           aux.push(filtered[acum]);
//           acum++;
//         }
//         acum++;
//       }
//       console.log(aux);
//       console.log(filtered);
//       return aux;
//     }
//   }
// };

// const getDetailVideogameByID = async (id) => {
//   if (isNaN(id)) {
//     const generos = [];
//     const game = await videogame.findByPk(id, {
//       include: {
//         model: genre,
//         attributes: ["name"],
//         through: { attributes: [] },
//       },
//     });
//     game.genres.map((a) => {
//       generos.push(a.name);
//     });

//     game.genres.splice(0, game.genres.length);
//     generos.map((a) => {
//       game.genres.push(a);
//     });
//     console.log(game);
//     return game.dataValues;
//   } else {
//     url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
//     const game = await axios.get(url);

//     const response = game.data;
//     const plataforma = [];
//     response.platforms.map((a) => {
//       plataforma.push(a.platform.name);
//     });
//     const generos = [];
//     response.genres.map((a) => {
//       generos.push(a.name);
//     });
//     const nuevoObjeto = {
//       id: response.id,
//       name: response.name,
//       backgroundImage: response.background_image,
//       platforms: plataforma,
//       description: response.description,
//       released: response.released,
//       rating: response.rating,
//       genres: generos,
//     };
//     return nuevoObjeto;
//   }
// };

// const createVideogameDB = async (game) => {
//   const {
//     name,
//     description,
//     platforms,
//     backgroundImage,
//     released,
//     rating,
//     genres,
//   } = game;
//   if (!name) {
//     throw new Error("Datos invalidos");
//   } else {
//     const newGame = await videogame.create({
//       name,
//       description,
//       platforms,
//       backgroundImage,
//       released,
//       rating,
//     });

//     newGame.addGenres(genres);

//     return newGame;
//   }
// };

// module.exports = {
//   createVideogameDB,
//   getDetailVideogameByID,
//   getVideogamesAPI,
//   getVideogamesBD,
//   getAllVideogames,
// };
