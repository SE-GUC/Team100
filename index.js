const app = express()
app.use(express.json())
const express = require('express')
const photo = require('./photo')
const FAQs = require('./FAQs')
const committe = require('./committee')
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

