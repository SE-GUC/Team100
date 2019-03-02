const express = require('express')
const app = express()
app.use(express.json())

const users = require('./routes/api/users')
app.use('/users',users)

const announcements = require('./routes/api/announcements')
app.use('/announcements',announcements)

const committee = require('./routes/api/committee')
app.use('/committee',committee)

const photo = require('./routes/api/photo')
app.use('/photo',photo)

const feedback = require('./routes/api/feedback')
app.use('/feedback',feedback)

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));