const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Club_hub = require("../../models/Club_hub");
const Achievement = require("../../models/Achievement");
const Announcement = require("../../models/Announcement");

//search for a club by name
router.get("/", async (req, res) => {
  try {
    const x = await Club_hub.find({
      name: req.body.name
    });
    const y = await Announcement.find({
      tag: req.body.tag
    });
    const z = await Achievement.find({
      tag: req.body.tag
    });

    res.json({ data: x + y + z });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
