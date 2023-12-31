const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getDogs} = require("../controllers/getDogs");
const { getDogById } = require('../controllers/getDogById');
const { createDogs } = require('../controllers/createDogs');
const {getTemperaments} = require("../controllers/getTemperaments");
const { deleteDog } = require("../controllers/deleteDog")

const router = Router();

// Configurar los routers
router.get("/dogs",getDogs)
router.get('/temperaments', getTemperaments)
router.get("/dogs/:id",getDogById)
router.post("/create",createDogs)
router.delete("/dogs/:id", deleteDog);



module.exports = router;
