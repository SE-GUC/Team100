const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())

const club = [
    { name: "MUN", vision: "OK", mission: "lalala", description:"description", logo:"https://www.pexels.com/search/kitten/",brief_description:"brief description"},
    { name: "nebny", vision: "no", mission: "asad", description:"description", logo:"https://www.facebook.com/Nebny/",brief_description:"brief_description"},
    { name: "VGS", vision: "oke", mission: "teto", description:"description", logo:"https://www.pexels.com/search/kitten/",brief_description:"brief_description"},
    { name: "TIQ", vision: "lalalala", mission: "nononono", description:"description", logo:"https://www.pexels.com/search/kitten/",brief_description:"brief_description"}

   
];

module.exports= router;

// user/admin view mission and vision
router.get('/', (req, res) => {
    const x = club.find(club => club.name === "MUN")
    const y = x.mission
    const f = x.vision
    const z= "Mission:" + " " + y + " " + "Vision:" + " " + f
    res.send(z)
})

// Update mission and vision
router.put('/MissionUpdate', (req, res) => {
   
        const updatedMission = req.body.mission;
        const schema = {
            mission: Joi.string().required()
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) 
        return res.status(400).send({ error: result.error.details[0].message });
    
        const x = club.find(club => club.name === "MUN")
        x.mission= updatedMission
        res.send(club)
 

})
router.put('/VisionUpdate', (req, res) => {
    
        const updatedVision = req.body.vision
        const schema = {
            vision: Joi.string().required()
        };
        const result = Joi.validate(req.body, schema);

        if (result.error) 
        return res.status(400).send({ error: result.error.details[0].message });
        const x = club.find(club => club.name === "MUN")
        x.vision= updatedVision
        res.send(club)
    
   

})