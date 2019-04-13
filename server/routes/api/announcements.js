const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport')
const Announcement = require("../../models/Announcement");
const validator = require("../../validations/announcementValidations");

// Get announcements
router.get("/", async (req, res) => {
  const announcements = await Announcement.find();
  res.json({ data: announcements });
});

//get a single announcement
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const wantedAnnouncement = await Announcement.findById(id).then(
      wantedAnnouncement => {
        res.status(200).json({
          Announcement: wantedAnnouncement
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Announcement not found."
    });
  }
});

// Create an announcement
router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "hub_admin") {
    const { description, date, title, created_by, videos, photos } = req.body;
    const announcement = await Announcement.findOne();
    const isValidated = validator.createValidation(req.body);
    if (!isValidated.error) {
      const newAnnouncement = new Announcement({
        _id: mongoose.Types.ObjectId(),
        description,
        date,
        title,
        created_by,
        videos,
        photos
      });
      newAnnouncement
        .save()
        .then(announcement => res.json({ data: announcement }))
        .catch(err => res.json({ error: "Can not create announcement" }));
    } else {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }
});

// update an announcement
router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "hub_admin") {
    const id = req.params.id;
    const updateAnnouncement = req.body;
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    } else {
      Announcement.updateOne({ _id: id }, { $set: updateAnnouncement })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Announcement is updated",
            Announcement: updateAnnouncement
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Announcement not found."
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

// delete an announcement
router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "hub_admin") {
    try {
      const id = req.params.id;
      const deletedAnnouncement = await Announcement.findByIdAndRemove(id);
      if (!deletedAnnouncement) {
        return res.status(404).send({ error: "Announcement does not exist" });
      } else {
        res.json({
          msg: "Announcement was deleted successfully",
          data: deletedAnnouncement
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Announcement not found."
      });
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }
});

module.exports = router;
