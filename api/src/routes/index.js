const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const videogamesRoutes = require("./videogamesRoutes");
const genreRoutes = require("./genreRoutes");
const platformsRoutes = require("./platformsRoutes");

router.use("/videogames", videogamesRoutes);
router.use("/genres", genreRoutes);
router.use("/platforms", platformsRoutes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
