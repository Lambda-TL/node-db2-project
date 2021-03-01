const express = require("express");
const router = express.Router();
const carsModel = require("./cars-model");
const middleware = require("./cars-middleware");

router.get("/", (req, res) => {
  carsModel
    .getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not retrieve cars from database" });
    });
});

router.get("/:id", middleware.checkCarId, (req, res) => {
  carsModel
    .getById(req.params.id)
    .then((car) => {
      res.status(200).json(car);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not retrive car from database" });
    });
});

router.post(
  "/",
  middleware.checkCarPayload,
  middleware.checkVinNumberValid,
  middleware.checkVinNumberUnique,
  (req, res) => {
    carsModel
      .create(req.body)
      .then((carId) => {
        carsModel
          .getById(carId)
          .then((car) => {
            res.status(200).json({ car });
          })
          .catch((err) => {
            res.status(500).json({
              message: "error in database when retrieving car using id",
              error: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error in database when creating car",
          error: err.message,
        });
      });
  },
);

router.delete("/:id", middleware.checkCarId, (req, res) => {
  carsModel
    .deleteCar(req.params.id)
    .then(() => {
      res.status(200).json({ message: "deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error in database when deleting car",
        error: err.message,
      });
    });
});

module.exports = router;
