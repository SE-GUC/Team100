const funcs = require("../fn/eventfn");


test("get an event", async done => {
  id="5c953831e4793067bcc3f233";
  const e = await funcs.getEvent(id);
  //console.log(e.data.data._id);
  expect(e.data.Event.id).toEqual(id); 
  done();
})

test("Get events happening this month", async done => {
  //expect.assertions(1);
  const response = await funcs.currentEvents();
  expect(response.data.data.length).toEqual(3);
  done();
})
