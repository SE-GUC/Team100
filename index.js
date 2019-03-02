const express = require('express');
//const events = require('./routes/api/events');
const events = require('./events')
const app = express();
app.use(express.json())

app.use('/events', events)

app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
})

const port = process.env.PORT | 5000
app.listen(port, () => console.log(`Listening on port ${port}`));