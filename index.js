const events = require('./events')
app.use('/events', events)

const express = require('express')
const app = express()
app.use(express.json())


const users = require('./routes/api/users')
const albums = require('./routes/api/albums')
const photo = require('./photo')
const photo = require('./routes/api/photo')
const FAQs = require('./FAQs')
const committe = require('./committee')
const committee = require('./routes/api/committee')
const Description = require('./Description')
const MissionAndVision = require('./MissionAndVision')
const Rating = require('./Rating')
const messages = require('./messages')
const team_members = require('./team_members')
const achievements = require('./achievements')
const feedback = require('./routes/api/feedback')
const subscribers = require('./subscribers')
const announcements = require('./announcements')
const announcements = require('./routes/api/announcements')




//const committe = require('./committee')

app.use('/MissionAndVision', MissionAndVision)
app.use('/Rating', Rating)
app.use('/api/users', users)
app.use('/api/photo', photo)
app.use('/api/FAQs', FAQs)
app.use('/api/albums', albums)
app.use('/api/Description', Description)
app.use('/api/subscribers', subscribers)
app.use('/api/announcements', announcements)
app.use('/announcements',announcements)
app.use('/committee',committee)
app.use('/api/committee', committe)
app.use('/photo',photo)
app.use('/feedback',feedback)
app.use('/messages', messages)
app.use('/team_members', team_members)
app.use('/achievements', achievements)
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to AWG Hub</h1>  `);
})


// Direct routes to appropriate files 


// Handling 404

app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })



const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

