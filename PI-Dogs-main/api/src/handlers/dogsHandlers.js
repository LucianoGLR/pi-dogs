const axios = require('axios')
require('dotenv').config();
const { URL } = process.env;
const { createDogDB, getDogById, getDogByName, getAllDogs } = require('../controllers/dogsControllers');
const { response } = require('express');

//? Handler para crear un nuevo perro
const createDog = async (req, res) => {
    const { name, image, height, weight, life_span } = req.body;
    try {
        const newDog = await createDogDB( name, image, height, weight, life_span );
        console.log('perro creado!')
        return res.status(201).json(newDog);
    } catch (error) {
        console.error('Error al crear el perro:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//? Handler para obtener todos los diferentes perros
const getDogsHandler = async (req, res) => {

    const {name} = req.query;

    try {
        if(name){
            const dogByName = await getDogByName(name);
            res.status(200).json(dogByName);
        } else {
            const response = await getAllDogs();
            res.status(200).json(response);
        }
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}


// const getDogsByQuery = async (req, res) => {
//     try {
//         const {name} = req.query;
        
//         if(!name){
//             return res.status(400).json({message: "debes colocar un nombre!"})
//         }
        
//         const response = await axios.get(URL);

//         const info = response.data.find(dog => dog.name.toLowerCase() === name.toLowerCase())
        
//         if(!info){
//             console.log();
//             res.status(400).json({message: `No se encontro ningun perro con el nombre ${name}`})
//         }
        
//         return res.json(info)
        
//     } catch (error) {
//         return res.status(200).send(error.message)
//     }
// }

const getDogDetail = async (req, res) => {
    
    const { id } = req.params;
    
    const source = isNaN(id) ? 'bdd' : 'api';
    
    try {
        const response = await getDogById(id, source);
        
        // if(!response){
            //     res.status(400).json({message: "No se encontro ningun perro con ese ID!"})
            // }
            return res.status(200).json(response)
            
    } catch (error) {
        return res.status(400).json(console.log(error))
    }
}

module.exports = {
    getDogsHandler,
    getDogDetail,
    createDog
}



// try {
//     const response = await axios.get(URL);
    
//     const info = response.data.map(dog => ({
//         id: dog.id,
//         image: dog.reference_image_id,
//         name: dog.name,
//         weight: dog.weight,
//         height: dog.height,
//         life_span: dog.life_span
//     }));

//     res.json(info)

// } catch (error) {
//     // Manejar errores en caso de que la solicitud falle
//     console.error('Error al obtener datos de la API:', error);
// }