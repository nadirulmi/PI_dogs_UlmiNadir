const { Dog } = require("../db");

// Controlador para eliminar un perro por su ID
const deleteDog = async (req, res) => {
  const {id} = req.params

  try {
    const dog = await Dog.findByPk(id);

    if (!dog) {
      return res.status(404).json({ message: "Perro no encontrado" });
    }

    // Eliminar el perro
    await dog.destroy();

    res.status(200).json({ message: `El perro con el id ${id} se ha eliminado exitosamente ` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { deleteDog };
