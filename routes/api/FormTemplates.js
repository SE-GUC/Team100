const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FormTemplate = require("../../models/FormTemplate");

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedForm = req.body;
  FormTemplate.update({ _id: id }, { $set: updatedForm })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Form Template is updated",
        FormTemplate: updatedForm
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Form Template not found."
      });
    });
});

router.post("/", async (req, res) => {
  const newForm = await FormTemplate.create(req.body);
  res.json({
    msg: "New Registration Form Template was created successfully",
    data: newForm
  });
});

module.exports = router;
