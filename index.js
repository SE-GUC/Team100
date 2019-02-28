const express = require('express')

const committe = require('./committee')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to MUN</h1>
    `);
})

// Direct routes to appropriate files 
app.use('/api/committee', committe)

//Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })

const port = 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))