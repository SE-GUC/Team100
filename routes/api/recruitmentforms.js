const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecruitmentForm = require("../../models/RecruitmentForm");
const validator = require("../../Validations/recruitmentformValidations");

router.get("/", async (req, res) => {
    const message = await RecruitmentForm.find();
    res.json({ data: message });
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const wantedForm = await RecruitmentForm.findById(id).then(
        wantedForm => {
          res.status(200).json({
            RecruitmentForm: wantedForm
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "recruitment form response not found."
      });
    }
  });
  router.post("/", async (req, res) => {
    try {
      const isValidated = validator.createValidation(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const newResponse = await RecruitmentForm.create(req.body);
      res.json({ msg: "Your response has been saved", data: newResponse });
    } catch (error) {
      console.log(error);
    }
  });
  
module.exports = router;
