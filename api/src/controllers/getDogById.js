const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds/';
const { Dog, Temperament } = require('../db');

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"

    if (source === "bdd") {
      const findDog = await Dog.findByPk(id, {
        include: Temperament, // Incluye la relación con Temperament
      });

      if (findDog) {
        const temperamentNames = findDog.Temperaments.map((temp) => temp.temperament).join(', ');

        return res.status(200).json({
          id: findDog.id,
          name: findDog.name,
          image: findDog.image,
          height: findDog.height,
          weight: findDog.weight,
          life_span: findDog.life_span,
          temperament: temperamentNames,
        });
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
        temperament: dogData.temperament,
        life_span: dogData.life_span,
      };

      return res.status(200).json(dog);
    }

    return res.status(404).json({ error: "No se encontró ningún perro con ese ID" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDogById,
};

