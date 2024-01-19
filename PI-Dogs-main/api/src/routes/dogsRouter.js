const { Router } = require('express')
const { getAllDogs, getDogsByQuery, createDog, getDogById} = require('../handlers/dogsHandlers')

const dogsRouter = Router()

//? Ruta para obtener todos los diferentes perros
dogsRouter.get('/', getAllDogs)

//? Ruta para crear un nuevo perro
dogsRouter.post('/', createDog)

//? Ruta para obtener todas las razas de perro que cooincidan con la informacion pasada por query
dogsRouter.get('/name?', getDogsByQuery)

//? Ruta para filtrar perros mediante su razaId
dogsRouter.get('/:id', getDogById)

module.exports = dogsRouter;