const axios = require('axios')
require('dotenv').config();
const { URL, API_KEY } = process.env;
const { Dog } = require('../db')

const createDog = async (req, res) => {
    try {
        // Crea un nuevo perro en la base de datos
        const { name, image, height, weight, life_span } = req.body;
        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            life_span,
        });
        console.log('perro creado!')
        return res.status(201).json(newDog);

    } catch (error) {

        console.error('Error al crear el perro:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });

    }
};

const getAllDogs = async (req, res) => {
    try {
        const response = await axios.get(URL);
        
        const info = response.data.map(dog => ({
            id: dog.id,
            image: dog.reference_image_id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            life_span: dog.life_span
        }));

        res.json(info)

    } catch (error) {
        // Manejar errores en caso de que la solicitud falle
        console.error('Error al obtener datos de la API:', error);
    }
}

const getDogsByQuery = async (req, res) => {
    try {
        const {name} = req.query;
        
        if(!name){
            return res.status(400).json({message: "debes colocar un nombre!"})
        }

        const response = await axios.get(URL);

        const info = response.data.find(dog => dog.name.toLowerCase() === name.toLowerCase())

        if(!info){
            res.status(400).json({message: `No se encontro ningun perro con el nombre ${name}`})
        }

        return res.json(info)

    } catch (error) {
        return res.status(200).send(error.message)
    }
}

const getDogById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const response = await axios.get(URL);
    
        const info = response.data.find(dog => dog.id === Number(id))

        if(!info){
            res.status(400).json({message: "No se encontro ningun perro con ese ID!"})
        }

        res.json(info)
        
    } catch (error) {
        res.json({message: "No se encontro ningun perro con ese ID!"})
    }
}

module.exports = {
    getAllDogs,
    getDogsByQuery,
    getDogById,
    createDog
}