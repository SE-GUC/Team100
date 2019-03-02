
const express = require('express')
const app = express()
app.use(express.json())

const users = require('./routes/api/users')
const albums = require('./routes/api/albums')
const photo = require('./photo')
const FAQs = require('./FAQs')
const committe = require('./committee')
const Description = require('./Description')
const MissionAndVision = require('./MissionAndVision')
const Rating = require('./Rating')
const messages = require('./messages')
const team_members = require('./team_members')
const subscribers = require('./subscribers')

app.use('/messages', messages)
app.use('/team_members', team_members)
app.use('/MissionAndVision', MissionAndVision)
app.use('/Rating', Rating)
app.use('/users', users)
app.use('/api/photo', photo)
app.use('/api/FAQs', FAQs)
app.use('/api/committee', committe)
app.use('/api/albums', albums)
app.use('/api/Description', Description)
app.use('/api/subscribers', subscribers)


app.get('/', (req, res) => {
    res.send(`<h1>Welcome to AWG Hub</h1>  `);
})


// Direct routes to appropriate files 
app.use('/api/committee', committe)





 })



const club = require('./routes/api/club')
const feedback = require('./routes/api/feedback')
const library = require('./routes/api/library')
// Direct routes to appropriate files 
app.use('/club', club)
app.use('/feedback',feedback)
app.use('/library',library)


// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))

