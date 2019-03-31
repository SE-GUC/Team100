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


module.exports = router;
