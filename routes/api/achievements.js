// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())

const achievements = [
    { photo:"https://www.pexels.com/search/kitten/",text:"Awards", id: "1"},
    { photo:"https://www.pexels.com/search/kitten/",text:"Certification",id: "2"}
]
module.exports=router;

//get all achievements
router.get('/', (req, res) => {
    res.send(achievements)
})

// Get a certain achievement
router.get('/:id', (req, res) => {
    const achievementId = req.params.id
    const achievement = achievements.find(achievement => achievement.id === achievementId)
    res.send(achievement)
})

//Create an achievement
router.post('/', (req, res) => {
  const photo = req.body.photo
  const text = req.body.text

  const schema = {
    photo: Joi.string().required(),
    text: Joi.string().required(),
}

const result = Joi.validate(req.body, schema);

if (result.error) return res.status(400).send({ error: result.error.details[0].message });

        
  const achievement = {
       id: achievements.length + 1,
       photo: photo, 
       text: text
    } 
    achievements.push(achievement)
    res.send(achievements)
    }    
)

//Update an achievement's text
router.put('/achievementstext/:id', (req, res) => {
    const achievementId = req.params.id 
    const updatedText = req.body.text
    const schema = {
        text: Joi.string().required(),
    }
    
    const result = Joi.validate(req.body, schema);
    
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });


    const achievement = achievements.find(achievement => achievement.id === achievementId)
    achievement.text = updatedText
    res.send(achievements) 
})

//update an achievement's photo
router.put('/achievementsphoto/:id', (req, res) => {
    const achievementId = req.params.id 
    const updatedPhoto = req.body.photo
    const schema = {
        photo: Joi.string().required(),
    }
    
    const result = Joi.validate(req.body, schema);
    
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const achievement = achievements.find(achievement => achievement.id === achievementId)
    achievement.photo = updatedPhoto
    res.send(achievements)
})
//Delete an achievement
router.delete('/:id', (req, res) => {
    const achievementId = req.params.id 
    const achievement = achievements.find(achievement => achievement.id === achievementId)
    const index = achievements.indexOf(achievement)
    if (achievement && index!== null){
        achievements.splice(index,1)
        res.send(achievements)
    }
    else{
        res.status(400).send({ err :'Invalid value for achievements id' });

    }
    
    }
)
