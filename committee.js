// Dependencies
const express = require("express");
const Joi = require("joi");
//const uuid = require('uuid');
const router = express.Router();

// Models
//const committe = require('../../committee');

const app = express();
app.use(express.json());

const committee = [
  {
    name: "Marketing",
    description: "Responsible for Marketing Campaigns",
    page: "www.page.com",
    events: ["recruitment", "opening"],
    team_members: ["Yomna", "Dina"]
  },
  {
    name: "Security Council",
    description: "Simulating UN SC",
    page: "www.page.com",
    events: ["conference", "sessions"],
    team_members: ["Dalia"]
  }
];


//get all committees

router.get("/", (req, res) => {
  res.send(committee);
});

//create committee

router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const page = req.body.page;
  const events = req.body.events;
  const team_members = req.body.team_members;

  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    page: Joi.string().required(),
    events: Joi.array().required(),
    team_members: Joi.array().required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const comm = {
    name: name,
    description: description,
    page: page,
    events: events,
    team_members: team_members
  };
  committee.push(comm);
  return res.json({ data: comm });
});

//update committee's description

router.put("/update/description/:name", (req, res) => {
  const commName = req.params.name;
  const updatedDescription = req.body.description;
  const schema = {
    //	commName: Joi.string().required(),
    description: Joi.string().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });
  let comm = committee.find(comm => comm.name === commName);

  comm.description = updatedDescription;
  return res.send(comm);
});

//update committee's page
router.put("/update/page/:name", (req, res) => {
  const commName = req.params.name;
  const updatedPage = req.body.page;

  const schema = {
   // commName: Joi.string().required(),
    page: Joi.string().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const comm = committee.find(comm => comm.name === commName);
  comm.page = updatedPage;
  return res.send(committee);
});

//update committee's events
router.put("/update/events/:name", (req, res) => {
  const commName = req.params.name;
  const updatedEvents = req.body.events;
  const schema = {
   // commName: Joi.string().required(),
    events: Joi.array().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const comm = committee.find(comm => comm.name === commName);
  comm.events = updatedEvents;
  res.send(committee);
});

//delete committee

router.delete("/:name", (req, res) => {
  const name = req.params.name;

  const schema = {
    commName: Joi.string().required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send({ error: result.error.details[0].message });

  const comm = committee.find(comm => comm.name === name);
  const index = committee.indexOf(comm);
  committee.splice(index, 1);
  res.send(committee);
});

module.exports = router;
