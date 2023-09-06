const { Router } = require("express");

const genreRoutes = Router();
const { getGenres, postGenres } = require("../handlers/genrehandlers");

genreRoutes.get("/", getGenres);
genreRoutes.post("/", postGenres);

module.exports = genreRoutes;
