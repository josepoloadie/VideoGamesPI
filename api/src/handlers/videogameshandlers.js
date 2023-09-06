const {
  createVideogameDB,
  getDetailVideogameByID,
  getVideogamesAPI,
  getAllVideogames,
} = require("../controllers/videoGamesControllers");

const getVideogames = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await getAllVideogames({ name });
    res.status(200).send(response);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// /:id => params
const getDetailVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getDetailVideogameByID(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// body ===> info
const postVideogame = async (req, res) => {
  const {
    name,
    description,
    platforms,
    backgroundImage,
    released,
    rating,
    genres,
  } = req.body;
  try {
    const response = await createVideogameDB({
      name,
      description,
      platforms,
      backgroundImage,
      released,
      rating,
      genres,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getVideogames, getDetailVideogame, postVideogame };
