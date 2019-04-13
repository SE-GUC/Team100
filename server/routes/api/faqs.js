const express = require("express");
const Joi = require("joi");
const router = express.Router();
const mongoose = require("mongoose");
const Faq = require("../../models/Faq");
const validator = require("../../validations/faqValidation");
const passport = require('passport')

// creat a faq with mongo db
router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "hub_admin") {
    const faq1 = new Faq({
      answer: req.body.answer,
      question: req.body.question
    });
    const isValidated = validator.createValidation(req.body);
    try {
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      } else {
        return faq1.save().then(newFaq => {
          return res.status(201).json({
            message: "New FAQ was created successfully",
            Faq: newFaq
          });
        });
      }
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

// update a certain faq with mongo db
router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "hub_admin") {
    const id = req.params.id;
    const updatedFaq = req.body;
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    } else {
      Faq.updateOne({ _id: id }, { $set: updatedFaq })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "FAQ is updated successsfully",
            Faq: updatedFaq
          });
        });
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }
});

// delete a faq with mongo db
router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "hub_admin") {
    try {
      const id = req.params.id;
      const deletedFaq = await Faq.findByIdAndRemove(id);
      res.json({ msg: "FAQ was deleted successfully", data: deletedFaq });
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

// get all faqs
router.get("/", async (req, res) => {
  const faqs = await Faq.find();
  res.json({ data: faqs });
});

// get a certain faq
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wantedFaq = await Faq.findById(id);
    res.json({ data: wantedFaq });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
