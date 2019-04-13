const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport')

const Clubmun = require("../../models/Clubmun");
const validator = require("../../validations/clubmunValidations");

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const info = new Clubmun({
    mission: req.body.mission,
    vision: req.body.vision,
    description: req.body.description,
    logo: req.body.logo
  });
  const isValidated = validator.createValidation(req.body);
  try {
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    } else {
      return info.save().then(newInfo => {
        return res.status(201).json({
          message: "The information is created successfully",
          Clubmun: newInfo
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  } else {
    Clubmun.update({ _id: id }, { $set: updateInfo })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "Information are updated",
          Clubmun: updateInfo
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Server error. Please try again."
        });
      });
  }
});

router.get("/", async (req, res) => {
  const info = await Clubmun.find();
  res.json({ data: info });
});
// user/admin view mission with mongoDB
router.get("/mission/:id", async (req, res) => {
  const id = await Clubmun.find();
  try {
    const wantedMission = await Clubmun.findById(id).then(wantedMission =>
      res.status(200).json({ x: wantedMission.mission })
    );
  } catch (error) {
    console.log(error);
  }
});

// user/admin view vision with mongoDB
router.get("/vision/:id", async (req, res) => {
  const id = await Clubmun.find();
  try {
    const wantedVision = await Clubmun.findById(id).then(wantedVision =>
      res.status(200).json({ x: wantedVision.vision })
    );
  } catch (error) {
    console.log(error);
  }
});

// user/admin view description with mongoDB
router.get("/description/:id", async (req, res) => {
  const id = await Clubmun.find();
  try {
    const wantedDescription = await Clubmun.findById(id).then(
      wantedDescription =>
        res.status(200).json({ x: wantedDescription.description })
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
