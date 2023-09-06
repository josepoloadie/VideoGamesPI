const {
  createGenreBD,
  getGenreAPI,
} = require("../controllers/genreControllers");

const getGenres = async (req, res) => {
  try {
    const response = await getGenreAPI();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postGenres = async (req, res) => {
  try {
    const { id, name } = req.body;
    const response = await createGenreBD({ id, name });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getGenres, postGenres };
