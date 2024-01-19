const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const temperamentRouter = require('./temperamentRouter');

// const url = () => `${URL}/?key=${API_KEY}`;

const router = Router();

router.use('/dogs', dogsRouter)

router.use('/temperaments', temperamentRouter)

module.exports = router;
