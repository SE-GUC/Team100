const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const committee = require("../../models/Committee");
const validator = require("../../validations/committeeValidations");
//get committees
router.get("/", async (req, res) => {
  const Committees = await committee.find();
  res.json({ data: Committees });
});

//create committee with if condition

router.post("/", async (req, res) => {
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
    const newComm = await comm.create(req.body);
    res.json({ msg: "committee was created successfully", data: newComm });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

//update committee
router.put("/:name", async (req, res) => {
  const name = req.params.name;
  const updatedComm = req.body;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  } else {
    committee
      .update({ name: name }, { $set: updatedComm })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "committe is updated successsfully",
          Committee: updatedComm
        });
      });
  }
});

//delete committee
router.delete("/:name", async (req, res) => {
  try {
    const committeeName = req.params.name;
    const deletedCommittee = await committee.findOneAndDelete(committeeName);
    res.json({
      msg: "committee was deleted successfully",
      data: deletedCommittee
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
