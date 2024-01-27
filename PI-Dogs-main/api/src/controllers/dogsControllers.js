const { default: axios } = require('axios');
require('dotenv').config();
const { URL } = process.env;
const { Dog } = require('../db');
const { cleanInfoAPI } = require('../utils/index');
const { where, Op } = require('sequelize');

//? Controller para crear un nuevo perro
const createDogDB = async (name, image, height, weight, life_span) => {
    return await Dog.create({ name, image, height, weight, life_span })
}

//? Controller para obtener todos los diferentes perros y tambien via query
const getDogByName = async (name) => {

    const infoAPI = await axios.get(URL);

    const dogsAPI = cleanInfoAPI(infoAPI)

    const dogFiltered = dogsAPI.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
    // const dogFiltered = dogsAPI.filter((dog) => dog.name === name);

    const dogsDB = await Dog.findAll({ where: { name: {[Op.iLike]: `%${name}%`} } });
    // const dogDB = await Dog.findAll({ where: { name: name } })

    return [...dogFiltered, ...dogsDB];
}

const getDogById = async (id, source) => {
    const dogData = source === 'api' ? (await axios.get(`${URL}/${id}`)).data : await Dog.findByPk(id)
    return dogData;
}


const getAllDogs = async () => {
    const dogsDB = await Dog.findAll();
    const infoAPI = await axios.get(URL);
    const dogsAPI = cleanInfoAPI(infoAPI)
    return [...dogsDB, ...dogsAPI];
}

module.exports = { createDogDB, getDogById, getDogByName, getAllDogs };