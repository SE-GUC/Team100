
const express = require('express');
const messages = require('./messages')
const team_members = require('./team_members')
const app = express();
app.use(express.json())

//const router = express.Router();
//const Joi = require('joi');

// Direct routes to appropriate files 
app.use('/messages', messages)
app.use('/team_members', team_members)

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
