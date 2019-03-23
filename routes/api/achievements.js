const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Achievement = require("../../models/Achievement")
const validator = require("../../validations/achievementValidations")

router.post("/", async (req, res) => {
  const achievement = new Achievement({
    description: req.body.description,
    photo: req.body.photo,
    tag: req.body.tag
  })
  const isValidated = validator.createValidation(req.body)
  try {
    if (isValidated.error) {
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message })
    } else {
      return achievement.save().then(newAchievement => {
        return res.status(201).json({
          message: "New achievement was created successfully",
          Achievement: newAchievement
        })
      })
    }
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const deletedAchievement = await Achievement.findByIdAndRemove(id).then(
      deletedAchievement => {
        res.status(200).json({
          message: "Achievement deleted successfully",
          Achievement: deletedAchievement
        })
      }
    )
  } catch (error) {
    res.status(500).json({
      message: "Achievement not found."
    })
  }
})

router.get("/", async (req, res) => {
  const achievements = await Achievement.find()
  res.json({ data: achievements })
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const wantedAchievement = await Achievement.findById(id).then(
      wantedAchievement => {
        res.status(200).json({
          Achievement: wantedAchievement
        })
      }
    )
  } catch (error) {
    res.status(500).json({
      message: "Achievement not found."
    })
  }
})

router.put("/:id", async (req, res) => {
  const id = req.params.id
  const updateAchievement = req.body
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error) {
    return res.status(400).send({ error: isValidated.error.details[0].message })
  } else {
    Achievement.update({ _id: id }, { $set: updateAchievement })
      .exec()
      .then(() => {
        res.status(200).json({
          message: "Achievement is updated",
          Achievement: updateAchievement
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Achievement not found."
        })
      })
  }
})

module.exports = router
