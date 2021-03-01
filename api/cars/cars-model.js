const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id }).first();
};

const create = (car) => {
  return db("cars").insert(car);
};

const deleteCar = (id) => {
  return db("cars").del().where({ id });
};

module.exports = {
  getAll,
  getById,
  create,
  deleteCar,
};
