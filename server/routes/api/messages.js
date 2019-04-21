const express = require("express");
const Joi = require("joi");
const router = express.Router();
const app = express();
app.use(express.json());
const validator = require("../../Validations/messageValidations");
Message = require("../../Models/Message");
const passport = require("passport");

module.exports = router;

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (
      req.user.user_type === "user" ||
      "mun_admin" ||
      "hub_admin" ||
      "team_members"
    ) {
      try {
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error) {
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        }
        const newMessage = await Message.create(req.body);
        res.json({ msg: "Message was created successfully", data: newMessage });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).send({ error: "You have to sign in" });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      try {
        const messageId = req.params.id;
        const deletedMessages = await Message.findByIdAndRemove(messageId);
        if (!messageId)
          return res.status(404).send({ error: "Message does not exist" });
        if (deletedMessages.committee !== req.user.committee_type)
          return res.status(404).send({ error: "Unauthorized" });
        else {
          res.json({
            msg: "message was deleted successfully",
            data: deletedMessages
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

// get all msgs
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      const message = await Message.find();
      res.json({ data: message });
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      try {
        const id = req.params.id;
        const message = await Message.findById(id);
        if (!message) return res.status(404).send({ error: "No message" });
        // if (message.committee !== req.user.committee_type) {
        //   return res.status(404).send({ error: "Unauthorized" });
        // }
        const isValidated = validator.updateValidation(req.replied);
        if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        Message.updateOne({ _id: id }, { $set: { replied: true } })
          .exec()
          .then(() => {
            res.json({ msg: "Updated successfully" });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(404).send({ error: "Unauthorized" });
    }
  }
);

//get committee messages
// router.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
//   if (req.user.user_type === "mun_admin") {
//     try {
//       const committee = req.params.id;
//       const name = committee.name;
//       const message = await Message.find({ message: name });
//       if (!message) return res.status(404).send({ error: "No messages" });
//       if (message.committee === req.user.committee_type) {
//         return res.status(404).send({ error: "Unauthorized" });
//       }
//       else {
//         res.json({ data: message })
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   else {
//     return res
//       .status(404)
//       .send({ error: "Unauthorized" });
//   }
// });
