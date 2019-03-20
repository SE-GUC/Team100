const express =require('express');
const router=express.Router();
const Joi=require('joi');


const photo=[
    {id:"1",album_id:"1",link:"https://www.pexels.com/search/kitten/",description : "kittens"},
    {id:"2",album_id:"2",link:"https://www.pexels.com/search/kitten/", description : "cats"}

]
// add photo
router.post("/", (req, res) => { 
    const id = req.body.id;
    const albumID = req.body.album_id;
    const photoLink = req.body.link;
    const descrip = req.body.description;
    const ph = {
      id: photo.length + 1,
      album_id: albumID,
      link: photoLink,
      description: descrip
    };
    const schema = {
        album_id:Joi.string().min(1).required(),
        link:Joi.string().required()
     }
 
     const result = Joi.validate(req.body, schema);
 
     if (result.error) return res.status(400).send({ error: result.error.details[0].message });
    photo.push(ph);
    res.send(photo);
  });
  
  
