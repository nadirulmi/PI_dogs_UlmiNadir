const { Dog, Temperament } = require("../db");
const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const { API_KEY } = process.env;

const getDogs = async (req, res) => {
  try {
    const { name } = req.query;

    // Realizar una solicitud a la API para obtener todas las razas
    const response = await axios.get(`${URL}?api_key=${API_KEY}`);

    if (response.status === 200) {
      const apiDogs = response.data.map((dog) => ({
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        height: dog.height.metric,
        weight: dog.weight.metric,
        temperament: dog.temperament,
        life_span: dog.life_span,
        created: false,
      }));

      let allDogs = [...apiDogs];

      // Filtrar los perros de la API por el nombre proporcionado
      if (name) {
        allDogs = allDogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      // Buscar perros en la base de datos
      const databaseDogs = await Dog.findAll({
        include: Temperament,
      });

      if (name) {
        // Filtrar los perros de la base de datos por el nombre proporcionado
        const filteredDatabaseDogs = databaseDogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
        allDogs = [...filteredDatabaseDogs, ...allDogs];
      } else {
        allDogs = [...databaseDogs, ...allDogs];
      }

      // Modificar el temperamento de los perros de la base de datos
      allDogs = allDogs.map((dog) => {
        if (dog.created) {
          // Perro creado: transformar los temperamentos
          const temperamentNames = dog.Temperaments.map(
            (temp) => temp.temperament
          ).join(", ");
          return {
            ...dog.dataValues, // Copiar todos los datos existentes
            temperament: temperamentNames, // Agregar temperamento transformado
          };
        }
        return dog; // Perro de la API, no realizar cambios
      });

      return res.status(200).json(allDogs);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogs };
