const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const Joi = require("joi");
const bcrypt = require('bcrypt')
const User = require("../../models/User");
const validator = require("../../validations/userValidations");

// get all users
router.get("/", async (req, res) => {
    const users = await User.find()
    res.json({ data: users })
})

//as a user i should be able t readmy information

router.get("/get_user/:id", async (req, res) => {
    const id = req.params.id
    try {
        const u = await User.findById(id).then(
            u => { res.status(200).json({ User: u }) })
    }
    catch (error) {
        res.status(500).json({
            message: "User not found."
        })
    }
})

//create user
router.post('/register', async (req, res) => {
    const {
        name,
        email,
        birth_date,
        password,
        major,
        telephone,
        photo,
        gucian,
        club,
        committee_type,
        user_type } = req.body
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ error: 'Email already exists' })

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const newUser = new User({
        name,
        email,
        birth_date,
        password: hashedPassword,
        major,
        telephone,
        photo,
        gucian,
        club,
        committee_type,
        user_type
    })
    newUser
        .save()
        .then(user => res.json({ data: user }))
        .catch(err => res.json({ error: 'Can not create user' }))
})

//delete user
router.delete('/delete_user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndRemove(id)
        res.json({ msg: 'User was deleted successfully', data: deletedUser })
    }
    catch (error) {
        console.log(error)
    }
})

//update user
router.put("/update_user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ error: "user does not exist" });
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error)
            return res
                .status(400)
                .send({ error: isValidated.error.details[0].message });
        User.update({ _id: id }, { $set: req.body })
            .exec()
            .then(() => {
                res.json({ msg: "User updated successfully" });
            });
    } catch (error) {
        // We will be handling the error later
        console.log(error);
    }
});


module.exports = router;