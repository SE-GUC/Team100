const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const Joi = require("joi");
const bcrypt = require('bcrypt')
const User = require("../../models/User");
const validator = require("../../validations/userValidations");
const tokenKey = require('../../config/keys').secretOrKey
const jwt = require('jsonwebtoken')
const passport = require('passport')

//get all users
router.get("/", async (req, res) => {
    const users = await User.find()
    res.json({ data: users })
})

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // You can access the logged in user through req.user
    // Add your authorization rules accordingly
    const users = await User.find()
    return res.json({ data: users })
    // return res.json({data: req.user})
})

//as a user i should be able to read my information
router.get("/:id", async (req, res) => {
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

router.post('/register', async (req, res) => {
    try {
        const isValidated = validator.registerValidation(req.body);
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message });
        const { name, email, birth_date, password, major, telephone, photo, gucian, club, committee_type, user_type } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ email: 'Email already exists' });
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
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
        });
        await User.create(newUser);
        res.json({ msg: 'User created successfully', data: newUser });
    } catch (error) {
        res.status(422).send({ error: 'Can not create user' });
    }
});

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
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) return res.status(404).send({ error: "user does not exist" });
        const isValidated = validator.updateValidation(req.body);
        if (isValidated.error)
            return res
                .status(400)
                .send({ error: isValidated.error.details[0].message });
        User.updateOne({ _id: id }, { $set: req.body })
            .exec()
            .then(() => {
                res.json({ msg: "User updated successfully" });
            });
    } catch (error) {
        // We will be handling the error later
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ email: 'Email does not exist' });
        const match = bcrypt.compareSync(password, user.password);
        if (match) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(payload, tokenKey, { expiresIn: '1h' })
            return res.json({ token: `Bearer ${token}` })
        }
        else return res.status(400).send({ password: 'Wrong password' });
    } catch (e) { }
});


router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await User.find()
    res.json({ data: users })
});

module.exports = router;