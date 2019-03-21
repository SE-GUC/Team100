// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())


const subscribers = [
    {
        name: 'Yara',
        email: 'yara@guc.com'
    },
    {
        name: 'Doha',
        email: 'doha@guc.com'
    },
    {
        name: 'Ziad',
        email: 'ziad@guc.com'
    },
    {
        name: 'Sara',
        email: 'yomna@guc.com'
    }
]

module.exports = router;

// Get all subscribers
router.get('/', (req, res) => {
    res.send(subscribers)
})

// Get a certain subscriber
router.get('/:name', (req, res) => {
    const subsName = req.params.name
    const sbs = subscribers.find(sbs => sbs.name === subsName)
    res.send(sbs)
})

// Create a subscribers
router.post('/', (req, res) => {
     const name = req.body.name
     const email = req.body.email
     const schema = {
        name :Joi.string().required(),
        email :Joi.string().required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) 
    return res.status(400).send({error: result.error.details[0].message});
     const subscriber = {
         name: name,
         email: email,
      
      }
     subscribers.push(subscriber)
     return res.json({data: subscribers});
     //res.send(subscribers)
 })