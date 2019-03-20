const express = require("express");
const Joi=require('joi');
const router=express.Router();
const faqs = [
  {
    id: "1",
    question: "what clubs are included in this hub?",
    answer: "GUCMUN,Nebny,VGS & TIQ"
  },
  {
    id: "2",
    question: "What university do these clubs belong to?",
    answer: "German University in Cairo"
  }
];
// create a frequently asked question
router.post("/", (req, res) => {
  const id = req.body.id;
  const question = req.body.question;
  const answer = req.body.answer;
  const FAQ = {
    id: faqs.length + 1,
    question: question,
    answer: answer
  };
  const schema = {
       question:Joi.string().required(),
       answer:Joi.string().required()
  }
	const result = Joi.validate(req.body, schema);
	if (result.error) return res.status(400).send({ error: result.error.details[0].message });
  faqs.push(FAQ);
  res.send(faqs);
});

// get a certain faq
router.get("/:id", (req, res) => {
  const faqID = req.params.id
  const y = faqs.find(y => y.id === faqID)
  res.send(y);
});

// get all faqs
router.get("/", (req, res) => {
    res.send(faqs)
})

// update a certain faq answer
router.put("/:id", (req, res) => {
  const faqID = req.params.id;
  const updatedAnswer = req.body.answer;
  const x = faqs.find(x => x.id === faqID);
  x.answer = updatedAnswer;
  res.send(x);
});

//update a certain faq question
router.put("/question/faqs/:id", (req, res) => {
  const faqID = req.params.id;
  const updatedQuestion = req.body.question;
  const x = faqs.find(x => x.id === faqID);
  x.question = updatedQuestion;
  res.send(x);
});

//delete faqs
router.delete('/:id', (req, res) => {
    const faqId = req.params.id 
    const x = faqs.find(x => x.id === faqId)
    const index = faqs.indexOf(x)
    if(x && index!==null){
      faqs.splice(index,1)
      res.send(faqs)
    }
    else{
      res.status(400).send({err: 'Invalid value for FAQ ID'});
    }

});
module.exports=router;