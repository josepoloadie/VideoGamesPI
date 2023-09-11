const { Router } = require("express");

const platformsRoutes = Router();
const { getPlatforms } = require("../handlers/platformshandlers");

platformsRoutes.get("/", getPlatforms);

module.exports = platformsRoutes;
