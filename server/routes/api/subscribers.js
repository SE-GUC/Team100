const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subscriber = require("../../models/Subscriber");
const validator = require("../../validations/subscriberValidations");
const passport = require('passport')

// get subscribers
router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    const subscribers = await Subscriber.find();
    res.json({ data: subscribers });
  }
  else {
    return res
      .status(401)
      .send({ error: "Unauthorized" });
  }
});

//get single subscriber
router.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
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
  }
  else {
    return res
      .status(401)
      .send({ error: "Unauthorized" });
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
