// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())

const descriptions = [
    {
        name: 'MUN',
        text: 'asjndmsnanjazj'
    },
    {
        name: 'Enactus',
        text: 'asjndmsnanjazj'
    },
    {
        name: 'Inspire',
        text: 'asjndmsnanjazj'
    },
    {
        name: 'TedxGUC',
        text: 'asjndmsnanjazj'
    },

]
module.exports = router;

// Get club description
router.get('/', (req, res) => {
    res.send(descriptions)
})
// Get a certain club description
router.get('/:name', (req, res) => {
    const clubName = req.params.name
    const club = descriptions.find(club => club.name === clubName)
    res.send(club)
})
// Update description
router.put('/:name', (req, res) => {
    const clubname = req.params.name 
    const updatedtext = req.body.text
    const schema = {
        text :Joi.string().required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) 
    return res.status(400).send({error: result.error.details[0].message});

    const des = descriptions.find(des => des.name === clubname)
    des.text = updatedtext
    return res.json({data: descriptions});

    //res.send(descriptions)

});