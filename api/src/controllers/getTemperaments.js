const { Temperament } = require("../db");
const axios = require("axios");

const URL = `https://api.thedogapi.com/v1/breeds`;

const getTemperaments = async (req, res) => {
  try {
    const response = await axios.get(URL);

    if (response.status === 200) {
      const data = response.data;

      const uniqueTemperaments = new Set(
        data
          .map((dog) => dog.temperament)
          .join(", ")
          .split(/,\s*/)
          .filter((temperament) => temperament.length > 0) // Eliminate empty strings
      );

      const temperamentsArray = Array.from(uniqueTemperaments);

      for (const temperament of temperamentsArray) {
        await Temperament.findOrCreate({
          where: {
            temperament: temperament,
          },
          defaults: { temperament: temperament },
        });
      }

      const allTemperaments = await Temperament.findAll({
        attributes: ["temperament"],
      });

      res.status(200).json(allTemperaments);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getTemperaments,
};
