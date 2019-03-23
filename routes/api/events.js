const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Event = require("../../models/Event");
const validator = require("../../validations/eventValidations");

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json({ data: events });
});

router.get("/eventbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const exists = await Event.findById(id).then(exists => {
      res.status(200).json({
        Event: exists
      });
    });
  } catch (error) {
    res.send("event doesnt exist");
  }
});

router.get("/timeline/current", async (req, res) => {
  var currentTime = new Date().getMonth() + 1;
  var currentYear = new Date().getFullYear();

  console.log(currentYear);
  const exists = await Event.find({
    $and: [{ month: currentTime }, { year: currentYear }]
  });

  //const exists = await Event.find("date":{now.getMonth()}, )
  if (!exists) return res.send("no events happening this month");
  else res.send({ data: exists });
});
//module.exports = router

router.get("/timeline/f_soon", async (req, res) => {
  var currentMonth = new Date().getMonth();
  var currentYear = new Date().getFullYear() - 1;

  console.log(currentYear);
  const exists = await Event.find({
    $and: [{ year: { $gt: currentYear } }, { description: "coming soon" }]
  });

  if (!exists) return res.send("no events happening this month");
  else res.send({ data: exists });
});

module.exports = router;
