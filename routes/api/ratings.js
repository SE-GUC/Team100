const express = require('express');
	const Joi = require('joi');
	//const uuid = require('uuid');
	const router = express.Router();
	const app = express();
	app.use(express.json())
	

	

	const event = [
	    { id: "1", club: "MUN", name: "10th anniversary", date:"11/11/2011", photo:"https://www.pexels.com/search/kitten/",title:"10th anniversary",feedback:["gamed","gamed awi"],place:"Uni",description:"description",committee:"Marketing", rating: 50, ratingCount: 10, rate:5},
	    { id: "2", club: "VGS", name: "recruitment", date:"11/11/2011", photo:"https://www.pexels.com/search/kitten/",title:"recruitment",feedback:["not much","lazeez"],place:"BUE",description:"description",committee:"HR", rating: 40, ratingCount: 10, rate: 4 },
	    { id: "3", club: "TIQ", name: "opening", date:"11/11/2011", photo:"https://www.pexels.com/search/kitten/",title:"opening",feedback:["asd","asd"],place:"Hilton Hotel",description:"description",committee:"Fundraising", rating: 30, ratingCount: 10, rate: 3},
	    { id: "4", club: "MUN", name: "conference", date:"11/11/2011", photo:"https://www.pexels.com/search/kitten/",title:"conference",feedback:["dsa","dsa"],place:"Kempinski Hotel",description:"description",committee:"Security Council", rating: 20, ratingCount: 10, rate:2} 
	];
	module.exports= router;
	//rate an event
	router.put('/:id', (req, res) => {
	    const EventID = req.params.id 
	    const NewRating = req.body.rating
	    const schema = {
	        rating: Joi.number().max(5).min(1).required()
	    };
	    const result = Joi.validate(req.body, schema);
	

	    if (result.error) 
	    return res.status(400).send({ error: result.error.details[0].message });
	    const x = event.find(event => event.id === EventID)
	    //const NewRatingCount = x.ratingCount
	

	    
	   // if(!(NewRating >5 || NewRating< 1)){
	        x.ratingCount= x.ratingCount + 1
	        x.rating = x.rating + NewRating
	        x.rate= x.rating/x.ratingCount
	        res.send(event)
	   // }
	   // else {
	       // res.send("You entered an invalid number")  
	   // }
	

	})
	//view rate 
	router.get('/GetRate/:id', (req, res) => {
	    const EventID = req.params.id
	    const x = event.find(event => event.id === EventID)
	   const y = x.rate + ""
	    res.send(y)
	})

