const express = require("express");
const router = express.Router();

const RecruitmentForm = require("../../models/RecruitmentForm");
const validator = require("../../validations/recruitmentformValidations");

router.get("/", async (req, res) => {
  const message = await RecruitmentForm.find();
  res.json({ data: message });
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
