// Import express
const express = require('express');
const Joi = require('joi');
// Create the app
//const app = express()
// Use it with post
//app.use(express.json())
const router = express.Router();


const albums=[
    {id: '1',title: 'Session 1',description: 'Session one photos covered by mdi team',photo: 'https://www.pexels.com/search/kitten/',uploaded_at: '11/11/2011'},
    {id: '2',title: 'Conference Day 1',description: 'Conference day one photos covered by mdi team',photo: 'https://www.pexels.com/search/kitten/',uploaded_at: '12/11/2012'}
]

router.get('/', (req, res) => {
    res.send(albums)
})

router.get('/:id', (req, res) => {
    const albumId = req.params.id
    const album = albums.find(album => album.id === albumId)
    res.send(album)
})

router.post('/', (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const photo = req.body.photo
    var date = Date.now()
    const uploaded_at = new Date(date)
    const newId = albums.length + 1

    const schema ={
        title: Joi.string().required(),
        description: Joi.string()
    }

    const result = Joi.validate(req.body, schema);

    if(result.error) return res.status(400).send({error: result.error.details})
    
    const album = {       
        id: newId + '',
        title: title,
        description: description,
        photo: photo,
        uploaded_at: uploaded_at +''
    }
    albums.push(album)
    res.send(albums)
})


// if you dont enter a paramater (title), byghayarha le null
router.put('/:id', (req, res) => {
    const albumId = req.params.id 
    const album = albums.find(album =>  album.id ===albumId)
    // const updatedAlbum = albums.filter(updatedAlbum => updatedAlbum.id === albumId)[0]
    // const index = albums.indexOf(updatedAlbum)
    // if(updatedAlbum && index!==null){
    //     const keys = Object.keys(req.body)
    //     keys.forEach(key => {
    //         updatedAlbum[key] = req.body[key]
    //     })
    // }
    // albums[index] = updatedAlbum
    if(req.body.title){
        const updatedTitle = req.body.title
        album.title = updatedTitle
        const schema = {
            title: Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);
        if(result.error) return res.status(400).send({error: result.error.details})
    }
    if(req.body.description){
        const updatedDescription = req.body.description
        album.description = updatedDescription
        const schema = {
            description: Joi.string().required()
        }
        const result = Joi.validate(req.body, schema);
        if(result.error) return res.status(400).send({error: result.error.details})
    }
    if(req.body.photo){
        const updatedPhoto = req.body.photo
        album.photo = updatedPhoto 
    }
    res.send(albums)
})


router.delete('/:id', (req, res) => {
    const albumId = req.params.id 
    const album = albums.find(album => album.id === albumId)
    const index = albums.indexOf(album)
    if(album && index!==null){
    albums.splice(index,1)
    }
    res.send(albums)
})

// Define the port, get it from the enviroment (used in production)
// Or just use 3000
//const port = process.env.PORT | 3000
//app.listen(port, () => console.log(`Server up and running on port ${port}`))
 
module.exports = router;