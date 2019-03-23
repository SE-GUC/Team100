// Dependencies
const express = require("express");
const Feedback = require("../../models/Feedback");
const validator = require("../../validations/feedbackValidations");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const event_id = req.params.id;
    const feedbacks = await Feedback.find({ event: event_id });
    if (!feedbacks)
      return res
        .status(404)
        .send({ error: "There are no feedebacks for this event" });
    res.json({ data: feedbacks });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newFeedback = await Feedback.create(req.body);
    res.json({ msg: "Feedback was created successfully", data: newFeedback });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

module.exports = router;
