const express = require('express');
const Joi = require('joi');
const router = express.Router();
const app = express();
app.use(express.json())

const events = [
    { id: "1", club: "MUN", name: "10th anniversary", date:"11/11/2011", rating:"4", RatingCount:"5", rate:"2", photo:"https://www.pexels.com/search/kitten/",title:"10th anniversary",feedback:["gamed","gamed awi"],place:"Uni",description:"description",committee:"Marketing"},
    { id: "2", club: "VGS", name: "recruitment", date:"11/11/2011", rating:"5", RatingCount:"5", rate:"2", photo:"https://www.pexels.com/search/kitten/",title:"recruitment",feedback:["not much","lazeez"],place:"BUE",description:"description",committee:"HR"},
    { id: "3", club: "TIQ", name: "opening", date:"11/11/2011", rating:"3", RatingCount:"5", rate:"2", photo:"https://www.pexels.com/search/kitten/",title:"opening",feedback:["asd","asd"],place:"Hilton Hotel",description:"description",committee:"Fundraising"},
    { id: "4", club: "MUN", name: "conference", date:"11/11/2011", rating:"4", RatingCount:"5", rate:"2", photo:"https://www.pexels.com/search/kitten/",title:"conference",feedback:["dsa","dsa"],place:"Kempinski Hotel",description:"description",committee:"Security Council"} 
];

//create
router.post('/', (req, res)=>{
    //const id = req.body.id
    var club = req.body.club
    var name = req.body.name
    var date = req.body.date
    var rating = 0
    var RatingCount = 0
    var rate = 0
    var photo = req.body.photo
    var title = req.body.title
    var feedback = req.body.feedback
    var place = req.body.place
    var description = req.body.description
    var committee = req.body.committee

    if(!club) return res.status(400).send({ err: 'Club field is required' });
    if (typeof club !== 'string') return res.status(400).send({ err: 'Invalid value for club' });

    if(!name) return res.status(400).send({ err: 'Name field is required' });
    if (typeof name !== 'string') return res.status(400).send({ err: 'Invalid value for name' });

    if(!date) return res.status(400).send({ err: 'Date field is required' });
    if (typeof date !== 'string') return res.status(400).send({ err: 'Invalid value for date' });

    // if(!rating) return res.status(400).send({ err: 'Rating field is required' });
    // if (typeof rating !== 'string') return res.status(400).send({ err: 'Invalid value for rating' });

    if(!photo) return res.status(400).send({ err: 'Photo field is required' });
    if (typeof photo !== 'string') return res.status(400).send({ err: 'Invalid value for photo' });

    if(!title) return res.status(400).send({ err: 'Title field is required' });
    if (typeof title !== 'string') return res.status(400).send({ err: 'Invalid value for title' });

    if(!feedback) return res.status(400).send({ err: 'Feedback field is required' });
    if (typeof feedback !== 'string') return res.status(400).send({ err: 'Invalid value for feedback' });

    if(!place) return res.status(400).send({ err: 'Place field is required' });
    if (typeof place !== 'string') return res.status(400).send({ err: 'Invalid value for place' });

    if(!description) return res.status(400).send({ err: 'Description field is required' });
    if (typeof description !== 'string') return res.status(400).send({ err: 'Invalid value for description' });

    if(!committee) return res.status(400).send({ err: 'Committee field is required' });
    if (typeof committee !== 'string') return res.status(400).send({ err: 'Invalid value for committee' });

    const schema = {
        club: Joi.string().required(),
        name: Joi.string().required(),
        date: Joi.string().required(),
        // rating: Joi.string(),
        photo: Joi.string().required(),
        title: Joi.string().required(),
        feedback: Joi.string(),
        place: Joi.string().required(),
        description: Joi.string().required(),
        committee: Joi.string().required()
    }

    const result = Joi.validate(req.body, schema)

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const event = {
        id: events.length + 1,
        club: club,
        name: name,
        date: date,
        rating: rating,
        RatingCount: RatingCount,
        rate: rate,
        photo: photo,
        title: title,
        feedback: feedback,
        place: place,
        description: description,
        committee: committee,
    }
    events.push(event)
    res.send(events)
})
//update
router.put('/:id', (req, res) => {
    const eventID = req.params.id
    const event = events.find(event => event.id === eventID)

    if(req.body.club !== undefined){
        if(typeof req.body.club === 'string'){
        event.club = req.body.club
        }else{
            return res.status(400).send({ err: 'Invalid value for club' });
        }
    }
    if(req.body.name !== undefined){
        if(typeof req.body.name === 'string'){
        event.name = req.body.name
        }else{
            return res.status(400).send({ err: 'Invalid value for name' });
        }
    }
    if(req.body.date !== undefined){
        if(typeof req.body.date === 'string'){
        event.date = req.body.date
        }else{
            return res.status(400).send({ err: 'Invalid value for date' });
        }
    }
    if(req.body.photo !== undefined){
        if(typeof req.body.photo === 'string'){
        event.photo = req.body.photo
        }else{
            return res.status(400).send({ err: 'Invalid value for photo' });
        }
    }
    if(req.body.title !== undefined){
        if(typeof req.body.title === 'string'){
        event.title = req.body.title
        }else{
            return res.status(400).send({ err: 'Invalid value for title' });
        }
    }
    if(req.body.feedback !== undefined){
        if(typeof req.body.feedback === 'string'){
        event.feedback = req.body.feedback
        }else{
            return res.status(400).send({ err: 'Invalid value for feedback' });
        }
    }
    if(req.body.place !== undefined){
        if(typeof req.body.place === 'string'){
        event.place = req.body.place
        }else{
            return res.status(400).send({ err: 'Invalid value for place' });
        }
    }
    if(req.body.description !== undefined){
        if(typeof req.body.description === 'string'){
        event.description = req.body.description
        }else{
            return res.status(400).send({ err: 'Invalid value for description' });
        }
    }
    if(req.body.committee !== undefined){
        if(typeof req.body.committee === 'string'){
        event.committee = req.body.committee
        }else{
            return res.status(400).send({ err: 'Invalid value for committee' });
        }
    }
    res.send(events)
})
//read certain event
router.get('/:id', (req, res)=>{
    const eventID = req.params.id
    const event = events.find(event => event.id === eventID)
    res.send(event)
})
//read all events
router.get('/',(req,res)=> {
    res.send(events)
})
//delete
router.delete('/:id', (req, res)=>{
    const eventID = req.params.id
    const event = events.find(event => event.id === eventID)
    const index = events.indexOf(event)
    if(event !== undefined && index !== undefined){
    events.splice(index,1)
    }
    res.send(events)
})

module.exports = router;