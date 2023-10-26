const { Temperament } = require("../db");
const axios = require("axios");

const URL = `https://api.thedogapi.com/v1/breeds`;

const getTemperaments = async (req, res) => {
  try {
    // Hacer una solicitud a la API para obtener datos de razas de perros
    const response = await axios.get(URL);

    // Verificar si la solicitud se realizó con éxito (código de estado 200)
    if (response.status === 200) {
      const data = response.data;

      const uniqueTemperaments = new Set(
        data
          .map((dog) => dog.temperament)
          .join(', ') // Unir todas las cadenas en una cadena separada por comas
          .split(/,\s*/) // Dividir por comas seguidas de espacios
          .filter((temperament) => temperament.length > 0) // Eliminar cadenas vacías
      );

      const temperamentsArray = Array.from(uniqueTemperaments);

      // Crear un arreglo de objetos para bulkCreate
      const temperamentsToInsert = temperamentsArray.map((temperament) => ({ temperament: temperament }));

      // Utilizar bulkCreate para insertar los temperamentos en la base de datos
      await Temperament.bulkCreate(temperamentsToInsert);

      // Una vez completada la operación, busca todos los temperamentos en la base de datos
      const allTemperaments = await Temperament.findAll();

      res.status(200).json(allTemperaments);
    }
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getTemperaments,
};
