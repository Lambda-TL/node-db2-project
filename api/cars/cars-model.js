const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id });
};

const create = (car) => {
  return db("cars").insert(car);
};

module.exports = {
  getAll,
  getById,
  create,
};
