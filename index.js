const express = require('express')
const app = express()
app.use(express.json())
const photo = require('./photo')
const FAQs = require('./FAQs')
const committe = require('./committee')
const MissionAndVision = require('./MissionAndVision')
const Rating = require('./Rating')


const messages = require('./messages')
const team_members = require('./team_members')


//const router = express.Router();
//const Joi = require('joi');

// Direct routes to appropriate files 
app.use('/messages', messages)
app.use('/team_members', team_members)
app.use('/MissionAndVision', MissionAndVision)
app.use('/Rating', Rating)



//const committe = require('./committee')

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to MUN</h1>  `);
})
app.use('/api/photo', photo)
app.use('/api/FAQs', FAQs)
app.use('/api/committee', committe)

app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })
const port = 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))

