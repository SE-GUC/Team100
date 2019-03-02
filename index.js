const express = require('express')
const app = express()
app.use(express.json())

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