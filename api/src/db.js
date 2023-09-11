const { Sequelize } = require("sequelize");
require("dotenv").config(); //Se requiere el archivo .env

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, BDD } = process.env; //Se importan las variables del archivo .env
const DB_DEPLOY =
  "DB_DEPLOY=postgresql://postgres:dLQJEdaVxUPFn7WHNhzl@containers-us-west-76.railway.app:7985/railway";
const VideogameModel = require("./models/Videogame");
const GenreModel = require("./models/Genre");
console.log("HOLA");

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${BDD}`,
//   { logging: false, native: false }
// );

const sequelize = new Sequelize(DB_DEPLOY, { logging: false, native: false });

//Definicion de modelos a usar
VideogameModel(sequelize);
GenreModel(sequelize);

const { videogame, genre } = sequelize.models;

videogame.belongsToMany(genre, { through: "VideogameGenre" });
genre.belongsToMany(videogame, { through: "VideogameGenre" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
