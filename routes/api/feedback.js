const express =require('express');
const router=express.Router();

const Feedback=[
   
    {id:"1",viewer_id:"8",text:"cool event",event:"recruitment"}, 
    {id:"2",viewer_id:"",text:"good food",event:"opening"},
    {id:"3",viewer_id:"7",text:"nice",event:"recruitment"}
    
    ]
    /*router.get('/read_Feedback/:id', (req, res) => {
        const id = req.params.id
        //const event_name= req.body.name
        const f = Feedback.find(Feedback => Feedback.id === id)
        res.send(f)
    })*/

    router.get('/read_Feedback/', (req, res) => {
        //const id = req.params.id
        const event_name= req.body.event
        const f = Feedback.filter(Feedback => Feedback.event === event_name)
        res.send(f)
    })
module.exports=router