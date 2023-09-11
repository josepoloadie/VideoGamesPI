const { getPlatformsAPI } = require("../controllers/platformsControllers");
const getPlatforms = async (req, res) => {
  try {
    const response = await getPlatformsAPI();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPlatforms };
