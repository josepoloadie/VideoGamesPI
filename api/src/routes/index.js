const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const videogamesRoutes = require("./videogamesRoutes");
const genreRoutes = require("./genreRoutes");

router.use("/videogames", videogamesRoutes);
router.use("/genres", genreRoutes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
