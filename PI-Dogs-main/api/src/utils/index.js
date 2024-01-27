const cleanInfoAPI = (arr) => arr.data.map(dog => {
    return {name: dog.name,
            image: dog.image,
            weight: dog.weight,
            height: dog.height,
            life_span: dog.life_span,
            created: false
        }
})

module.exports = {
    cleanInfoAPI
};