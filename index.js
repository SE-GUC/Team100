const express = require('express')
const app = express()
app.use(express.json())

const users = require('./routes/api/users')
app.use('/users', users)


app.get('/', (req, res) => {
    res.send(`<h1>Welcome to MUN</h1>  `);
})


app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })
const port = 5000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
