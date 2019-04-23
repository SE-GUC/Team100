const express = require("express");
const router = express.Router();
const passport = require('passport')

const RecruitmentForm = require("../../models/RecruitmentForm");
const validator = require("../../validations/recruitmentformValidations");

router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    const message = await RecruitmentForm.find();
    res.json({ data: message });
  }
  else {
    return res
      .status(401)
      .send({ error: "Unauthorized" });
  }
});

router.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    const id = req.params.id;
    try {
      const wantedForm = await RecruitmentForm.findById(id).then(wantedForm => {
        res.status(200).json({
          RecruitmentForm: wantedForm
        });
      });
    } catch (error) {
      res.status(500).json({
        message: "recruitment form response not found."
      });
    }
  }
  else {
    return res
      .status(401)
      .send({ error: "Unauthorized" });
  }
});

//not done
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
