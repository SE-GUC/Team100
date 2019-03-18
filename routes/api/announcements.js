// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())


const announcements  = [
    {
        id: '1',
        description: 'kittens event',
        date: '11/11/2011',
        tag:'#Event',
        created_by: 'Mariam',
        videos: 'https://www.pexels.com/search/kitten/',
        photos: 'https://www.pexels.com/search/kitten/'
    },
    {
        id: '2',
        description: 'Cinnabon in the Platform!',
        date: '10/10/2010',
        tag:'#fun',
        created_by: 'Doha',
        videos: 'https://www.pexels.com/search/kitten/',
        photos: 'https://www.pexels.com/search/kitten/'
    },
    {
        id: '3',
        description: 'Google event brought to you by VGS',
        date: '9/9/2019',
        tag:'#google',
        created_by: 'Ziad',
        videos: 'https://www.pexels.com/search/kitten/',
        photos: 'https://www.pexels.com/search/kitten/'
    }
]
module.exports = router;

// Create an announcement
router.post('/', (req, res) => {
    const id = req.body.id
    const description = req.body.description
    const date = req.body.date
    const tag = req.body.tag
    const created_by = req.body.created_by
    const videos = req.body.videos
    const photos = req.body.photos
    
    const schema = {
        description :Joi.string().required(),
        tag :Joi.string().required(),
        created_by : Joi.string().required(),
        date : Joi.date().required(),
        photos : Joi.string().required(),
        videos : Joi.string().required(),
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) 
    return res.status(400).send({error: result.error.details[0].message});
  
    const announcement = {
        id: announcements.length +1,
        description: description,
        date: date,
        tag: tag,
        created_by: created_by,
        videos: videos,
        photos: photos,
     }
     announcements.push(announcement)
     return res.json({data: announcements});

     //res.send(announcements)
})

// read an announcement
router.get('/', (req, res) => {
    res.send(announcements)
})

// Delete an announcement 
router.delete('/:id', (req, res) => {
    const announcementID = req.params.id
    const announcement = announcements.find(announcement => announcement.id === announcementID)
    const index = announcements.indexOf(announcement)
    announcements.splice(index,1)
    res.send(announcements)
})