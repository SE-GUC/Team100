const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscriber = require("../../models/Subscriber");
const validator = require("../../validations/subscriberValidations");

// get subscribers
router.get("/", async (req, res) => {
  const subscribers = await Subscriber.find();
  res.json({ data: subscribers });
});
//get single subscriber
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const wantedSubscriber = await Subscriber.findById(id).then(
      wantedSubscriber => {
        res.status(200).json({
          Subscriber: wantedSubscriber
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Subscriber not found."
    });
  }
});

// create a subscriber

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const subscriber = await Subscriber.findOne({ email });
  if (subscriber)
    return res.status(400).json({ error: "Email already exists" });
  const isValidated = validator.createValidation(req.body);
  if (!isValidated.error) {
    const newSubscriber = new Subscriber({
      _id: mongoose.Types.ObjectId(),
      name,
      email
    });
    newSubscriber
      .save()
      .then(subscriber => res.json({ data: subscriber }))
      .catch(err => res.json({ error: "Can not create subscriber" }));
  } else {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
});

module.exports = router;
