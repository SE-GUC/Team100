// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())

const Feedback=[
    {id:"1",viewer_id:"8",text:"cool event",event:"recruitment"},
    {id:"2",viewer_id:"9",text:"good food",event:"opening"}
    
    ];
    router.post('/', (req, res) => {
        const fviewer_id = req.body.viewer_id
        const ftext = req.body.text
        const fevent = req.body.event
      const schema ={
viewer_id : Joi.string().required(),
text : Joi.string().required(),
event:Joi.string().required()
   }
   if(result.error)
   return res.status (400).send({error:result.error.details[0].message})
        const Feed = {
            id: Feedback.length + 1 ,
            viewer_id: fviewer_id,
            text: ftext,
            event: fevent


        }
        Feedback.push(Feed)
        res.send(Feedback)
    })
    









    module.exports=router;