const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  carsModel
    .getById(req.params.id)
    .then((car) => {
      if (car) {
        next();
      } else {
        res
          .status(404)
          .json({ message: `car with id ${req.params.id} is not found` });
      }
    })
    .catch(() => {});
};

const checkCarPayload = (req, res, next) => {
  if (req.body) {
    const { vin, make, model, mileage } = req.body;
    if (!vin) {
      res.status(400).json({ message: "vin is missing" });
    } else if (!make) {
      res.status(400).json({ message: "make is missing" });
    } else if (!model) {
      res.status(400).json({ message: "model is missing" });
    } else if (!mileage) {
      res.status(400).json({ message: "mileage is missing" });
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: "vin is missing" });
  }
};

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const carsDb = await carsModel.getAll();
  const vin = req.body.vin;

  const carWithVin = carsDb.filter((car) => car.vin === vin);

  if (carWithVin.length > 0) {
    res.status(400).json({ message: `vin ${vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
