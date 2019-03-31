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
// delete a FormTemplate with mongo db
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedForm = await FormTemplate.findByIdAndRemove(id);
    res.json({ msg: "Form Template was deleted successfully", data: deletedForm});
  } catch (error) {
    console.log(error);
  }
});


router.get("/", async (req, res) => {
  const FromTemp = await FormTemplate.find();
  res.json({ data: FromTemp });
});

router.get("/:id", async (req, res) => {
  const FormId = req.params.id;
  try {
    const wantedForm = await FormTemplate.findById(FormId).then(wantedForm => {
      res.status(200).json({
        FormTemplate: wantedForm
      });
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
