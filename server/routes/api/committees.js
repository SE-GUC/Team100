const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport')

const committee = require("../../models/Committee");
const validator = require("../../validations/committeeValidations");

//get committees
router.get("/", async (req, res) => {
  const Committees = await committee.find();
  res.json({ data: Committees });
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const wantedComm = await Committee.findById(id);
    res.json({ data: wantedComm });
  } catch (error) {
    console.log(error);
  }
});

//create committee with if condition
router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    const comm = new committee({
      name: req.body.name,
      description: req.body.description,
      page: req.body.page,
      events: req.body.events,
      team_members: req.body.team_members
    });
    const isValidated = validator.createValidation(req.body);

    try {
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      } else {
        return comm.save().then(newCommittee => {
          return res.status(201).json({
            msg: "committee was created successfully",
            data: newCommittee
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

//update committee
router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin" || req.user.control === true) {
    try {
      const id = req.params.id;
      const committee = await Committee.findById(id);
      if (!committee) return res.status(404).send({ error: "Committee does not exist" });
      if (committee.name !== req.user.committee_type) {
        return res.status(404).send({ error: "Unauthorized" });
      }
      const isValidated = validator.updateValidation(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      Committee.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(() => {
          res.json({ msg: "Committee updated successfully" });
        });
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

//delete committee
router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    try {
      const id = req.params.id;
      const deletedCommittee = await committee.findByIdAndRemove(id);
      res.json({
        msg: "committee was deleted successfully",
        data: deletedCommittee
      });
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
module.exports = router;
