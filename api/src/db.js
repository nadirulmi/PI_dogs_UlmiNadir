require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL } = process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
//   {
//     logging: false, 
//     native: false, 
//   }
// );

const sequelize = new Sequelize(
  DATABASE_URL,
  {
    logging: false, 
    native: false, 
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inject connection (sequelize) to all models
modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);


const { Dog, Temperament } = sequelize.models;

//relations
Dog.belongsToMany(Temperament, { through: "dogs_temperaments" });
Temperament.belongsToMany(Dog, { through: "dogs_temperaments" });

module.exports = {
  ...sequelize.models, 
  conn: sequelize,
};
