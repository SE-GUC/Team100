const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Event = require("../../models/Event");
const validator = require("../../validations/eventValidations");

//create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      try {
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) {
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        }
        const newEvent = await Event.create(req.body);
        res.json({ msg: "Event was created successfully", data: newEvent });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  }
);

//update
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      const id = req.params.id;
      const event = await Event.findByIdAndUpdate(id);
      if (!event) {
        return res.status(404).send({ error: "Event does not exist" });
      }
      const isValidated = validator.updateValidation(req.body);
      if (isValidated.error) {
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      } else {
        Event.updateOne({ _id: id }, { $set: req.body })
          .exec()
          .then(() => {
            res.status(200).json({
              message: "Event is updated successfully",
              Event: req.body
            });
          })
          .catch(err => {
            res.status(500).json({
              message: "Error"
            });
          });
      }
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  }
);

//read certain event
router.get("/:id", async (req, res) => {
  const eventID = req.params.id;
  try {
    const wantedEvent = await Event.findById(eventID);
    if (!wantedEvent) {
      return res.status(404).send({ error: "Event does not exist" });
    }
    res.json({data: wantedEvent.name_event, data1: wantedEvent.description
    });
  } catch (error) {
    console.log(error);
  }
});

//delete
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      try {
        const eventID = req.params.id;
        const deletedEvent = await Event.findByIdAndRemove(eventID);
        if (!deletedEvent) {
          return res.status(404).send({ error: "Event does not exist" });
        } else {
          res.json({
            msg: "Event was deleted successfully",
            data: deletedEvent
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  }
);

//get all mun events
router.get("/", async (req, res) => {
  try{
  const events = await Event.find({
    club: "MUN" || "mun"
  });
  res.json({ data: events });
}catch(error){
  console.log(error)
}
});


//get by id
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

//get current month events
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

//give a feedback
router.put("/feedback/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Event.findByIdAndUpdate(id);
  if (!event) {
    return res.status(404).send({ error: "Event does not exist" });
  }
  const userFeedback = req.body.feedback;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  } else {
    var updatedFeedback = event.feedback;
    updatedFeedback.push(userFeedback);
    Event.update({ _id: id }, { $set: { feedback: updatedFeedback } })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "Feedback is submitted successfully",
          Event: req.body
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Error"
        });
      });
  }
});

router.get("/rate/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const wantedevent = await Event.findById(id).then(wantedevent => {
      res.status(200).json({
        Rate: wantedevent.rate
      });
    });
  } catch (error) {
    console.log(error);
  }
});
//rate an event
router.put(
  "/rate/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (
      req.user.user_type === "user" ||
      "mun_admin" ||
      "hub_admin" ||
      "team_members"
    ) {
      try {
        const id = req.params.id;
        const userRate = req.body.rate;
        const eve = await Event.findById(id);
        const oldRating = eve.rating;
        const oldRatingcount = eve.ratingcount;
        const updatedRatingcount = oldRatingcount + 1;
        const updatedRating = oldRating + userRate;
        const updatedRate = updatedRating / updatedRatingcount;
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        Event.findByIdAndUpdate(
          id,
          {
            $set: {
              rate: updatedRate,
              rating: updatedRating,
              ratingcount: updatedRatingcount
            }
          },
          { upsert: true }
        );
        res.json({
          msg: "Event was rated successfully",
          Rate: updatedRate,
          Rating: updatedRating,
          Ratingcount: updatedRatingcount
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).send({ error: "You have to sign in" });
    }
  }
);

module.exports = router;
