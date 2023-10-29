const { Dog, Temperament } = require('../db');

const createDogs = async (req, res) => {
  try {
    const { name, image, height, weight, temperament, life_span } = req.body;

    if (!name || !image || !height || !weight || !temperament || !life_span) {
      throw new Error("Faltan datos");
    }

    // Busca los temperamentos en la base de datos y obtén sus IDs
    const temperamentIds = [];
    for (const temperamentName of temperament) {
      const foundTemperament = await Temperament.findOne({
        where: {
          temperament: temperamentName,
        },
        attributes: ['id'],
      });

      if (foundTemperament) {
        temperamentIds.push(foundTemperament.id);
      } else {
        throw new Error(`El temperamento "${temperamentName}" no existe`);
      }
    }

    const newDog = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
      temperament,
    });

    // Asocia el perro con los temperamentos
    await newDog.setTemperaments(temperamentIds);

    res.status(201).json(newDog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { createDogs };

