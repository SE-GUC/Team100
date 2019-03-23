const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Clubmun = require("../../models/Clubmun")
const validator = require("../../validations/clubmunValidations")

router.post("/", async (req, res) => {
  const info = new Clubmun({
    mission: req.body.mission,
    vision: req.body.vision,
    description: req.body.description,
    logo: req.body.logo
  })
  const isValidated = validator.createValidation(req.body)
  try {
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    } else {
      return info.save().then(newInfo => {
        return res.status(201).json({
          message: "The information is created successfully",
          Clubmun: newInfo
        })
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.put("/", async (req, res) => {
  const id = req.params.id
  const updateInfo = req.body
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error) {
    return res.status(400).send({ error: isValidated.error.details[0].message })
  } else {
    Clubmun.update({ _id: id }, { $set: updateInfo })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "Information are updated",
          Clubmun: updateInfo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Server error. Please try again."
        })
      })
  }
})

router.get("/", async (req, res) => {
  const info = await Clubmun.find()
  res.json({ data: info })
})

module.exports = router
