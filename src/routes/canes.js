const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const Cane = require("../models/cane");

router.post("/", (req, res, next) => {
  const cane = new Cane({
    _id: new mongoose.Types.ObjectId(),
    SN: req.body.SN,
    time: req.body.time,
    location: { ...req.body.location },
    torch: req.body.torch,
    accelerometer: req.body.accelerometer,
    gyroscope: req.body.gyroscope,
    ultrasonic: req.body.ultrasonic,
    proximity: req.body.proximity,
    battery: req.body.battery
  });
  cane
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "You added a new Walking stick",
        createdStick: result
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: "Server error POSTING that",
        error: err
      });
    });
});
router.post("/:caneId", (req, res, next) => {
  const id = req.params.caneId;
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  Cane.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: `successfully updated ${_id}`,
        ...result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:caneId", (req, res, next) => {
  const id = req.params.caneId;
  Cane.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "unable to find that Walking stick" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ error: err });
    });
});
router.patch("/:caneId", (req, res, next) => {
  const id = req.params.caneId;
  const updateOps = {};
  for (const [key, value] of Object.entries(req.body)) {
    updateOps[key] = value;
  }
  Cane.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
