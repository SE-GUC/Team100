const express =require('express');
const router=express.Router();

const photo=[
    {id:"1",album_id:"1",link:"https://www.pexels.com/search/kitten/",description : "kittens"},
    {id:"2",album_id:"2",link:"https://www.pexels.com/search/kitten/", description : "cats"}

]
//a user should be able to view photos

router.get('/view_photo/:id', (req, res) => {
    const id = req.params.id
    const s = photo.find(photo => photo.id === id)
    res.send(s)
})

//an admin should be able to update description about photos 
router.put('/update_photodesc/:id', (req, res) => {
    const photoId = req.params.id 
    const updated_description = req.body.description
    const p = photo.find(photo => photo.id === photoId)
    p.description = updated_description
    res.send(p)
})

//an admin should be able to delete photos
router.delete('/delete_photo/:id', (req, res) => {
    const pid = req.params.id 
    const p = photo.find(photo => photo.id === pid)
    const index = photo.indexOf(p)
    if(p!== null && index!== null){
    photo.splice(index,1)}
    res.send(photo)
})

//menna
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
    photo.push(ph);
    res.send(photo);
  });
  
  

module.exports=router