const { Dog, Temperament } = require("../db");
const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds";
const { API_KEY } = process.env;

const getDogs = async (req, res) => {
  try {
    const { name } = req.query;

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

      // Filter by name
      if (name) {
        allDogs = allDogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
      }

      // Filter dogs in database
      const databaseDogs = await Dog.findAll({
        include: Temperament,
      });

      if (name) {
        // Filter dogs by name in database
        const filteredDatabaseDogs = databaseDogs.filter((dog) =>
          dog.name.toLowerCase().includes(name.toLowerCase())
        );
        allDogs = [...filteredDatabaseDogs, ...allDogs];
      } else {
        allDogs = [...databaseDogs, ...allDogs];
      }

      if (allDogs.length == 0) {
        return res
          .status(404)
          .json({ message: "There is no dog by that name" });
      }

      // Modifying the temperament of the dogs in the database
      allDogs = allDogs.map((dog) => {
        if (dog.created) {
          const temperamentNames = dog.Temperaments.map(
            (temp) => temp.temperament
          ).join(", ");
          return {
            ...dog.dataValues,
            temperament: temperamentNames,
          };
        }
        return dog;
      });

      return res.status(200).json(allDogs);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogs };
