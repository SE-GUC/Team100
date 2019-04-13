// Dependencies
const express = require("express");
const Feedback = require("../../models/Feedback");
const validator = require("../../validations/feedbackValidations");
const passport = require('passport')
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const event_id = req.params.id;
    const feedbacks = await Feedback.find({ event: event_id });
    if (!feedbacks)
      return res
        .status(404)
        .send({ error: "There are no feedbacks for this event" });
    res.json({ data: feedbacks });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "user" || "mun_admin" || "hub_admin" || "team_members") {
    try {
      const isValidated = validator.createValidation(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const newFeedback = await Feedback.create(req.body);
      res.json({ msg: "Feedback was created successfully", data: newFeedback });
    } catch (error) {
      console.log(error);
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "You have to sign in" });
  }
});

module.exports = router;
