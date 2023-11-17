const { Dog } = require("../db");

const deleteDog = async (req, res) => {
  const { id } = req.params;

  try {
    const dog = await Dog.findByPk(id);

    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    await dog.destroy();

    res.status(200).json({
      message: `The dog with id ${id} has been successfully removed `,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { deleteDog };
