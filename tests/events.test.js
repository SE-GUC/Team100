const funcs = require("../fn/Eventfn");
const Event = require("../models/Event");

test("get events", async done => {
  const evBefore = await funcs.getevents();

  const newEvent = {
    name_event: "Speach",
    club: "ndnlan",
    year: 2019,
    month: 2,
    day: 2,
    photo: "adjklans",
    location: "GUC",
    description: "nnnn",
    committee: "HR",
    rating: 5
  };
  const newE = await funcs.createEvents(newEvent);
  const EvID = newE.data.data._id;
  const getE = Event.findOne({ _id: EvID });
  const evAfter = await funcs.getevents();
  console.log(evAfter.data);
  expect(evAfter.data.data.length).toEqual(evBefore.data.data.length + 1);
  expect(getE).toBeDefined();

  // await funcs.deleteCommittees(CommID);

  done();
});

test("create events", async done => {
  expect.assertions(11);
  const ev = {
    name_event: "event",
    club: "ndnlan",
    year: 2019,
    month: 2,
    day: 2,
    photo: "adjklans",
    location: "GUC",
    description: "nnnn",
    committee: "HR",
    rating: 5
  };
  const e = await funcs.createEvents(ev);
  const eventID = e.data.data._id;

  const getE = Event.findOne({ _id: eventID });
  expect(e.data.data.name_event).toEqual(ev.name_event);
  expect(e.data.data.description).toEqual(ev.description);
  expect(e.data.data.club).toEqual(ev.club);
  expect(e.data.data.year).toEqual(ev.year);
  expect(e.data.data.month).toEqual(ev.month);
  expect(e.data.data.day).toEqual(ev.day);
  expect(e.data.data.photo).toEqual(ev.photo);
  expect(e.data.data.location).toEqual(ev.location);
  expect(e.data.data.committee).toEqual(ev.committee);
  expect(e.data.data.rating).toEqual(ev.rating);

  expect(getE).toBeDefined();

  // await funcs.deleteEvents(eventID);

  done();
});