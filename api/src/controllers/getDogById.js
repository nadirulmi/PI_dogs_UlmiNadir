const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/';
const { Dog } = require('../db');

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"

    if (source === "bdd") {
      const findDog = await Dog.findByPk(id);

      if (findDog) {
        return res.status(200).json(findDog);
      }
    }

    const { data: dogData } = await axios(URL + id);

    if (dogData) {
      const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_ids=${id}`);
      let image = imageResponse.data[0].url;

      const dog = {
        id: id,
        name: dogData.name,
        image, 
        height: dogData.height.metric,
        weight: dogData.weight.metric,
        life_span: dogData.life_span,
      };

      return res.status(200).json(dog);
    }
  } catch (error) {
    return res.status(500).json({error: "No se encontró ningún perro con ese ID"});
  }
};

module.exports = {
  getDogById,
};
