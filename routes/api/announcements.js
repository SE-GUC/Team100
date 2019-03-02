const express =require('express');
const router=express.Router();


const announcements = [
    { id: "1", tag: "#Event", date: "11/11/2011", description: "kittens event" , created_by:"Mariam", videos: "https://www.pexels.com/search/kitten/" , photos:"https://www.pexels.com/search/kitten/"},
    { id: "2", tag: "#fun", date: "10/10/2010", description: "Cinnabon in the Platform!" , created_by:"Doha", videos: "https://www.pexels.com/search/kitten/" , photos:"https://www.pexels.com/search/kitten/"},
    { id: "3", tag: "#google", date: "9/9/2019", description: "Google event brought to you by VGS" , created_by:"Ziad", videos: "https://www.pexels.com/search/kitten/" , photos:"https://www.pexels.com/search/kitten/"}
   
];

router.put('/announcements_update/:id', (req, res) => {
    const an_id = req.params.id
    const announce = announcements.filter(announcements => announcements.id === an_id)[0]

    const index= announcements.indexOf(announce)
    if(announce&&index !== null){
    const keys = Object.keys(req.body)
    keys.forEach(key=> {
        announce[key] = req.body[key]
    })
    announcements[index]= announce
    res.json(announcements[index]) }
    else{
        res.status(400).send({ err: 'Invalid value for announcement id' });   

    }
}
)

module.exports=router