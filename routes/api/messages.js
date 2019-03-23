// Dependencies
const express = require("express");
const Joi = require("joi");
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json());
const validator = require("../../Validations/messageValidations");
Message = require("../../Models/Message");

module.exports = router;

router.post("/", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessages = await Message.findByIdAndRemove(messageId);
    res.json({
      msg: "message was deleted successfully",
      data: deletedMessages
    });
  } catch (error) {
    console.log(error);
  }
});

// get all msgs

router.get("/", async (req, res) => {
  const message = await Message.find();
  res.json({ data: message });
});

//get a specefic msg by id

router.get("/:id", async (req, res) => {
  const messageId = req.params.id;
  try {
    const wantedMessage = await Message.findById(messageId).then(
      wantedMessage => {
        res.status(200).json({
          Message: wantedMessage
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
