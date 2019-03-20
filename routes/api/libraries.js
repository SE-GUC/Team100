// Dependencies
const express = require('express');
const Joi = require('joi');
//const uuid = require('uuid');
const router = express.Router();
const app = express();
app.use(express.json())
const library=[
    {academic_paper:"www.twitter.com",resolution:"wwww.facebook.com",year:"2017"},
    {academic_paper:"www.youtube.com",resolution:"www.otlob.com",year:"2018"}

];
router.post('/', (req, res) => { 
    const academic_paper = req.body.academic_paper
    const resolution = req.body.resolution
    const year = req.body.year
    const schema ={
academic_paper : Joi.string().required(),
resolution : Joi.string().required(),
year:Joi.string().required()
}
const result = Joi.validate(req.body,schema);
if(result.error){
return res.status (400).send({error:result.error.details[0].message})}

    const paper = {
        academic_paper: academic_paper,
        resolution: resolution,
        year: year,

    }
    library.push(paper)
    res.send(library)
})
router.get('/:year', (req, res) => { 
    const paperyear = req.params.year
    const paper = library.find(paper => paper.year === paperyear)
    res.send(paper)
})
router.delete('/delete/:year', (req, res) => { //fine
    const paperyear = req.params.year
    const paper = library.find(paper => paper.year === paperyear)
    const index = library.indexOf(paper)
    library.splice(index,1)
    res.send(library)
})
module.exports=router;
