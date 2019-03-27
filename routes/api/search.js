const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Club_hub = require("../../models/Club_hub");
const validator = require("../../validations/club_hubValidations");
const Achievement = require("../../models/Achievement");
const validator2 = require("../../validations/achievementValidations");
const Announcement = require("../../models/Announcement");
const validator3 = require("../../validations/announcementValidations");

//search for a club by name
router.get("/club", async (req, res) => {
  try {
    const x = await Club_hub.findOne(
      {
        name: req.body.name
      },
      function(err, wantedClub) {
        // hanlde err..
        if (wantedClub) {
          res
            .status(403)
            .send(
              wantedClub.name + wantedClub.brief_description + wantedClub.logo
            );
        } else {
          res
            .status(403)
            .send("Sorry, we can not find what you are looking for");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// searching for achievements by tags
router.get("/achievement", async (req, res) => {
  try {
    const y = await Achievement.findOne(
      {
        tag: req.body.tag
      },
      function(err, wantedAchievement) {
        // hanlde err..
        if (wantedAchievement) {
          res
            .status(403)
            .send(
              wantedAchievement.description +
                wantedAchievement.photo +
                wantedAchievement.tag
            );
        } else {
          res
            .status(403)
            .send("Sorry, we can not find what you are looking for");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// searching for Announcements by tags
router.get("/announcements", async (req, res) => {
  try {
    const y = await Announcement.findOne(
      {
        tag: req.body.tag
      },
      function(err, wantedAnnouncement) {
        // hanlde err..
        if (wantedAnnouncement) {
          res
            .status(403)
            .send(
              "description:" +
                wantedAnnouncement.description +
                " " +
                "Date:" +
                " " +
                wantedAnnouncement.date +
                wantedAnnouncement.videos +
                wantedAnnouncement.photos +
                wantedAnnouncement.tag
            );
        } else {
          res
            .status(403)
            .send("Sorry, we can not find what you are looking for");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
