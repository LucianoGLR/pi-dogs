const axios = require('axios')
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getAllTemperaments = async (req, res) => {
    try {
        let response = await axios(URL);

        let info = response.data.map(dog => ({
            name: dog.name,
            temperament: dog.temperament
        }))

        res.json(info)
    } catch (error) {
        res.json(error.message)
    }
}

module.exports = getAllTemperaments;