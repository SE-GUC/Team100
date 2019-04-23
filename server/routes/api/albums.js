const express = require("express");
const Album = require("../../models/Album");
const validator = require("../../validations/albumValidations");
const router = express.Router();
const passport = require("passport");

router.get("/", async (req, res) => {
  const albums = await Album.find();
  res.json({ data: albums });
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const album = await Album.findById(id);
    if (!album) return res.status(404).send({ error: "Album does not exist" });
    res.json({ data: album });
  } catch (error) {
     // res.json({ error: error })
  }
});

router.get("/type/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const albums = await Album.find({ type: type });
    if (!albums)
      return res
        .status(404)
        .send({ error: "There are no albums with this type" });
    res.json({ data: albums });
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      try {
        const isValidated = validator.createValidation(req.body);
        if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        const newAlbum = await Album.create(req.body);
        res.json({ msg: "Album was created successfully", data: newAlbum });
      } catch (error) {
       // console.log(error);
      }
    } else {
      return res.status(401).send({ error: "Unauthorized" });
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
        const album = await Album.findById(id);
        if (!album)
          return res.status(404).send({ error: "Album does not exist" });
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error)
          return res
            .status(400)
            .send({ error: isValidated.error.details[0].message });
        Album.updateOne({ _id: id }, { $set: req.body })
          .exec()
          .then(() => {
            res.json({ msg: "Album updated successfully" });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(401).send({ error: "Unauthorized" });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.user_type === "mun_admin") {
      try {
        const id = req.params.id;
        const deletedAlbum = await Album.findByIdAndRemove(id);
        res.json({ msg: "Album was deleted successfully", data: deletedAlbum });
      } catch (error) {
        //console.log(error);
      }
    } else {
      return res.status(401).send({ error: "Unauthorized" });
    }
  }
);

module.exports = router;
