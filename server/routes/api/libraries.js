//Dependencies;
const express = require("express");
const Joi = require("joi");
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passport = require('passport')

const Library = require("../../models/Library");
const validator = require("../../Validations/LibraryValidations");

// create a new academic paper
router.post("/AcademicPaper", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    try {
      const isValidated = validator.createValidation(req.body);
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      }
      const newR = await Library.create(req.body);
      res.json({ msg: "Academic Paper was created successfully", data: newR });
    } catch (error) {
      console.log(error);
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }

});
// create a new Resolution
router.post("/Resolution", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    try {
      const isValidated = validator.createValidation(req.body);
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      }
      const newR = await Library.create(req.body);
      res.json({ msg: "Resolution was created successfully", data: newR });
    } catch (error) {
      console.log(error);
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }
});
// get academic paper by year
// router.get("/:year", async (req, res) => {
//   const x = req.params.Year;
//   const AP = await Library.findOne({ Year: x });
//   res.json({ data: AP });
// });
// get all academic papers
router.get("/", async (req, res) => {
  const AP = await Library.find();
  res.json({ data: AP });
});

//delete a certain academic paper
router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    try {
      const id = req.params.id;
      const deletedAP = await Library.findByIdAndRemove(id);
      res.json({
        msg: "Academic paper was deleted successfully",
        data: deletedAP
      });
    } catch (error) {
      // We will be handling the error later
      console.log(error);
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }
});
module.exports = router;