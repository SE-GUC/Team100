
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const validator = require("../../Validations/hierarchyValidations");
Hierarchy = require("../../Models/Hierarchy");

router.get("/", async (req, res) => {
   const hierarchy = await Hierarchy.find();
   res.json({ data: hierarchy });
 });

 router.get("/:id", async (req, res) => {
   const id = req.params.id;
   try {
     const wantedperson = await Hierarchy.findById(id).then(
       wantedperson => {
         res.status(200).json({
           Hierarchy: wantedperson
         });
       }
     );
   } catch (error) {
     res.status(500).json({
       message: "board member not found."
     });
   }
 });


 router.post("/", async (req, res) => {
   const { position, office, name, major, experience, photo } = req.body;
   const hierarchy = await Hierarchy.findOne();
   const isValidated = validator.createValidation(req.body);
   if (!isValidated.error) {
     const newPerson = new Hierarchy({
       _id: mongoose.Types.ObjectId(),
       position,
       office,
       name,
       major,
       experience,
       photo
     });
     newPerson
       .save()
       .then(hierarchy => res.json({ data: hierarchy }))
       .catch(err => res.json({ error: "Can not create new board member" }));
   } else {
     return res
       .status(400)
       .send({ error: isValidated.error.details[0].message });
   }
 });

 router.put("/:id", async (req, res) => {
   const id = req.params.id;
   const updateMember = req.body;
   const isValidated = validator.updateValidation(req.body);
   if (isValidated.error) {
     return res
       .status(400)
       .send({ error: isValidated.error.details[0].message });
   } else {
     Hierarchy.update({ _id: id }, { $set: updateMember })
       .exec()
       .then(() => {
         res.status(200).json({
           message: "Hierarchy is updated",
           Hierarchy: updateMember
         });
       })
       .catch(err => {
         res.status(500).json({
           message: "board member not found."
         });
       });
   }
 });
  // delete an announcement
 router.delete("/:id", async (req, res) => {
   try {
     const id = req.params.id;
     const deletedmember = await Hierarchy.findByIdAndRemove(id);
     if (!deletedmember) {
       return res.status(404).send({ error: "Board Member does not exist" });
     } else {
       res.json({
         msg: "Board Member was deleted successfully",
         data: deletedmember
       });
     }
   } catch (error) {
     res.status(500).json({
       message: "Board Member not found."
     });
   }
 });

module.exports = router;
