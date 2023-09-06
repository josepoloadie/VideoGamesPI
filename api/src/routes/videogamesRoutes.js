const { Router } = require("express");
const {
  getVideogames,
  getDetailVideogame,
  postVideogame,
} = require("../handlers/videogameshandlers");

const videogamesRoutes = Router();

videogamesRoutes.get("/", getVideogames);

videogamesRoutes.get("/:id", getDetailVideogame);

videogamesRoutes.post("/", postVideogame);

module.exports = videogamesRoutes;
