const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Club_hub = require("../../models/Club_hub");
const User = require("../../models/User");
const validator = require("../../validations/club_hubValidations");

// Create Club_hub
router.post("/", async (req, res) => {
  const club_hub = new Club_hub({
    name: req.body.name,
    brief_description: req.body.brief_description,
    logo: req.body.logo
  });
  const isValidated = validator.createValidation(req.body);
  try {
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    } else {
      return club_hub.save().then(newClub_hub => {
        return res.status(201).json({
          message: "New club was created successfully in the hub",
          Club_hub: newClub_hub
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const clubs = await Club_hub.find()
  res.json({ data: clubs })
})


// get brief description of the club by its name

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const wanteddescription = await Club_hub.findById(id).then(
      wanteddescription => {
        res.status(200).json({
          Description: wanteddescription.brief_description
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// update an brief description

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedDescription = req.body;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  } else {
    Club_hub.update({ _id: id }, { $set: updatedDescription })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "Description is updated",
          Description: updatedDescription
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Server error. Please try again."
        });
      });
  }
});

module.exports = router;
