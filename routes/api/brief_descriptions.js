// Dependencies
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

router.put('/:name', (req, res) => {
    const clubName = req.params.name 
   const updatedText = req.body.brief_description
   const schema = {
       club : Joi.array().required()
   };
   const result = Joi.validate(req.body,schema);
   if(result.error)
   return res.status (400).send({error:result.error.details[0].message})
    const clubX = club.find(clubX => clubX.name === clubName)
    clubX.brief_description = updatedText
   res.send(clubX) 
})



router.get('/clubDescription/:name', (req, res) => { 
    const clubName = req.params.name
    const clubY = club.find(clubY => clubY.name === clubName)
    res.send(clubY.description)
})
module.exports=router;
