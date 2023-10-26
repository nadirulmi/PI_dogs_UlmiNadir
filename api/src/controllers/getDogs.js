const { Dog, Temperament } = require('../db');
const axios = require('axios');
const URL = 'https://api.thedogapi.com/v1/breeds';

const getDogs = async (req, res) => {
  try {
    const { name } = req.query;

    const response = await axios.get(URL);

    if (response.status !== 200) {
      return res.status(500).json({ error: 'Error en la solicitud a la API' });
    }

    const apiDogs = await Promise.all(
      response.data.map(async (dog) => {
        const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_ids=${dog.id}`);
        const image = imageResponse.data[0]?.url || ''; // Usar una imagen por defecto si no hay URL

        return {
          id: dog.id,
          name: dog.name,
          image,
          height: dog.height.metric,
          weight: dog.weight.metric,
          life_span: dog.life_span,
          created: false,
        };
      })
    );

    const databaseDogs = await Dog.findAll({
      attributes: ['id', 'name', 'image', 'height', 'weight', 'life_span', 'created'],
      include: Temperament,
    });

    let allDogs = [ ...databaseDogs, ...apiDogs];

    if (name) {
      allDogs = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (allDogs.length === 0) {
      return res.status(404).json({ error: `No se encontraron razas con el nombre: ${name}` });
    } else {
      return res.status(200).json(allDogs);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogs };




