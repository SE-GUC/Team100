//
// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())

const members = [
    { id: "1", name: "Yomna", email: "yomna@gmail.com", password: "12345" , major:"law", telephone: "22222" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",committee:"Fundraising",admin:"0"},
    { id: "2", name: "Dina", email: "dina@gmail.com", password: "1234" , major:"met", telephone: "33333" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",committee:"Marketing",admin:"0"},
    { id: "3", name: "Dalia", email: "dalia@gmail.com", password: "abcd" , major:"bi", telephone: "111111" , photo:"https://www.pexels.com/search/kitten/",club:"TIQ",committee:"Marketing",admin:"0"}
    
];

module.exports= router;
// team memberssss
// update committee
router.put('/:id', (req, res) => {
    const memberId = req.params.id 
    const updatedCommittee = req.body.committee
    const member = members.find(member => member.id === memberId)
    member.committee = updatedCommittee
    res.send(member)
})

//update member to be an admin

router.put('/admin/:id', (req, res) => {
    const memberId = req.params.id 
    //const updatedAdmin = req.body.admin
    const updatedAdmin =1
    const member = members.find(member => member.id === memberId)
    member.admin = 1
   // updatedAdmin.admin = 1
    res.send(member)
})