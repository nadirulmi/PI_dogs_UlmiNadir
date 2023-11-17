const { Dog, Temperament } = require("../db");

const createDogs = async (req, res) => {
  try {
    const { name, image, height, weight, temperaments, life_span } = req.body;

    if (!name || !image || !height || !weight || !temperaments || !life_span) {
      throw new Error("Missing data");
    }

    const temperamentIds = [];
    for (const temperamentName of temperaments) {
      const foundTemperament = await Temperament.findOne({
        where: {
          temperament: temperamentName,
        },
        attributes: ["id"],
      });

      if (foundTemperament) {
        temperamentIds.push(foundTemperament.id);
      } else {
        throw new Error(`Temperament "${temperamentName}" does not exist`);
      }
    }

    const newDog = await Dog.create({
      name,
      image,
      height,
      weight,
      life_span,
      temperaments,
    });

    // Associates the dog with temperaments
    await newDog.setTemperaments(temperamentIds);

    res.status(201).json(newDog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { createDogs };
