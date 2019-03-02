const express = require('express')
// Create the app
const app = express()
// Use it with post
app.use(express.json())
const albums = require('./routes/api/albums') //fo2 ka2eny ba import


app.use('/api/albums', albums) //ta7t

app.use((req,res) => {
    res.status(404).send({err:'We can not find what you are looking for'});
})

const port = process.env.PORT | 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
 

