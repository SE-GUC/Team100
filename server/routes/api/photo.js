const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photo = require("../../models/Photo");
const validator = require("../../Validations/PhotoValidations");

// add photo done
router.post("/", async (req, res) => {
  const photoo = new photo({
    album_ID: req.body.album_ID,
    Link: req.body.Link,
    Description: req.body.Description
  });
  const isValidated = validator.createValidation(req.body);
  try {
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    } else {
      return photoo.save().then(newPhoto => {
        return res.status(201).json({
          message: "New Photo was uploaded successfully",
          photo: newPhoto
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// done bas lesa test
router.get("/view_photo/:Link", async (req, res) => {
  try {
    const Link = req.params.Link;
    // const wantedPhoto = await photo.find(Link).then(wantedPhoto =>
    //   res.status(200).json({
    //     Photo: wantedPhoto
    //   })
    // );

    const wantedPhoto = await photo.findOne(req.body);
    res.json({ data: wantedPhoto });
  } catch (error) {
    console.log(error);
  }
  // const wantedPhoto = await Photo.findOne(Link);
  // res.json({ data: wantedPhoto });
});

//an admin should be able to update description about photos  done not tested
router.put("/update_photodesc/:Link", async (req, res) => {
  try {
    const Link = req.params.Link;
    // const photo = await photo.findOne({ Link });
    // if (!photo) return res.status(404).send({ error: "Photo does not exist" });
    // const isValidated = validator.updateValidation(req.body);
    // if (isValidated.error)
    //   return res
    //     .status(400)
    //     .send({ error: isValidated.error.details[0].message });
    const updatedPhoto = await Photo.updateOne(req.body);
    res.json({ msg: "Description updated successfully" });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});

//an admin should be able to delete photos done
router.delete("/delete_photo/:Link", async (req, res) => {
  try {
    const Link = req.params.Link;
    const deletedphoto = await photo.findOneAndDelete(Link);
    res.json({ msg: "photo was deleted successfully", data: deletedphoto });
  } catch (error) {
    // We will be handling the error later
    console.log(error);
  }
});
module.exports = router;
