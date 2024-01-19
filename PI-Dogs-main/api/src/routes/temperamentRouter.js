
const { Router } = require('express');
const getAllTemperaments = require('../handlers/temperamentsHandlers');

const temperamentRouter = Router()

//? Ruta para obtener todos los diferentes temperamentos de los perros
temperamentRouter.get('/', getAllTemperaments)

module.exports = temperamentRouter;

