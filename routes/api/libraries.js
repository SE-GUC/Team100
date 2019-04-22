//Dependencies;
const express = require("express");
const Joi = require("joi");
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Library = require("../../models/Library");
const validator = require("../../Validations/LibraryValidations");

// done
router.post("/", async (req, res) => {
  const AP = new Library({
    Academic_paper: req.body.Academic_paper,
    Resolution: req.body.Resolution,
    Year: req.body.Year
  });
  const isValidated = validator.createValidation(req.body);
  try {
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    } else {
      return AP.save().then(newAP => {
        return res.status(201).json({
          message: "New Acadimic paper was Uploaded successfully",
          Library: newAP
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req,res) => {
  const library= await Library.find();
  res.json({ data: library });
});

//done
router.get("/:year", async (req, res) => {
  const Year = req.params.Year;
  const AP = await Library.findOne(Year);
  res.json({ data: AP });
});

//done
router.delete("/:year", async (req, res) => {
  try {
    const inYear = req.params.Year;
    const deletedAP = await Library.findOneAndDelete(inYear);
    res.json({
      msg: "Academic paper was deleted successfully",
      data: deletedAP
    });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
module.exports = router;
