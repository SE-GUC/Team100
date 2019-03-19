//
// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())

const messages=[
    {id:"1",sender:"yomna@gmail.com",committee:"Security Council",text:"Hi when does recruitment start",replied:"0",time:"11/11/2011"},
    {id:"2",sender:"dina@gmail.com",committee:"Marketing",text:"I love your newest campaign",replied:"0",time:"12/12/2012"}
]


router.post('/', (req, res) => {
    //const id = req.body.id
	const sender = req.body.sender
    const committee = req.body.committee
    const text = req.body.text
    const time = req.body.time
    const replied = req.body.replied

	const schema = {
		sender: Joi.string().min(11).required(),
        committee: Joi.string().required(),
        text: Joi.string().required(),
        replied: Joi.string().required(), 
        time : Joi.date().required()
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const message = {
        id: messages.length + 1,
		sender: sender,
        committee: committee,
        text: text,
        replied: replied,
        time: time
		
    };
    messages.push(message)
	return res.json({ data: messages });
});

// app.post ('/api/message/', (req, res) => {
//     const sender = req.body.sender
//     const committee = req.body.committee
//     const text = req.body.text
//     const replied = req.body.replied
//     const time = req.body.time 

   // console.log('hereee')
   // ??
   //if(req.body.sender === undefined || req.body.committee === undefined) { err:"email is required" }
   //else {
//     const  newMessage = {
//         sender : sender,
//         committee : committee,
//         text : text,
//         replied : replied,
//         time : time,
//         id : messages.length+1
//     };
//     message.push (newMessage)
//     res.send (message);
// });

module.exports= router;

router.get('/', (req, res) => {
    res.send(messages)
})

router.get('/:committee', (req,res) => {
    const messageCommittee = req.params.committee
    const message = messages.find(messages => messages.committee === messageCommittee)
    res.send(message)
})

router.delete('/:id', (req, res) => {
    const messageId = req.params.id 
    const message = messages.find(message => message.id === messageId)
    const index = messages.indexOf(message) 
    if (messages && index !== null ){
    messages.splice(index,1)
    res.send(messages)
    }
    else {
        return res.status (400).send ({ err: " invalid value for message id"})
    }
})
