const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require('passport')

const Achievement = require("../../models/Achievement")
const validator = require("../../validations/achievementValidations")

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
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
            Achievement: newAchievement,
            data: req.user
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
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
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
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

router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
  if (req.user.user_type === "mun_admin") {
    const id = req.params.id
    const updateAchievement = req.body
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) {
      return res.status(400).send({ error: isValidated.error.details[0].message })
    } else {
      Achievement.updateOne({ _id: id }, { $set: updateAchievement })
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
  }
  else {
    return res
      .status(404)
      .send({ error: "Unauthorized" });
  }

})

module.exports = router
