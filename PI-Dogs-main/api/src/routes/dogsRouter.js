const { Router } = require('express')
const { getDogsHandler, getDogsByQuery, createDog, getDogDetail} = require('../handlers/dogsHandlers')

const dogsRouter = Router()

//? Ruta para crear un nuevo perro
dogsRouter.post('/', createDog)

//? Ruta para obtener todos los diferentes perros
dogsRouter.get('/', getDogsHandler)

//? Ruta para filtrar perros mediante su razaId
dogsRouter.get('/:id', getDogDetail)

//? Ruta para obtener todas las razas de perro que cooincidan con la informacion pasada por query
// dogsRouter.get('/name?', getDogsByQuery)

module.exports = dogsRouter;