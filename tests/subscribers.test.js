const funcs = require("../fn/Subscriberfn");
const Subscriber = require("../models/Subscriber");

test("get subscribers", async done => {
  const subBefore = await funcs.getSubscriber();

  const s = {
    name: "lastTesting",
    email: "al@gmail.com"
  };
  const newS = await funcs.createSubscriber(s);
  const subID = newS.data.data._id;
  const getS = Subscriber.findOne({ _id: subID });
  const subAfter = await funcs.getSubscriber();

  expect(subAfter.data.data.length).toEqual(subBefore.data.data.length + 1);
  expect(getS).toBeDefined();
  // await funcs.deleteCommittees(CommID);

  done();
});

test("create subscriber", async done => {
  expect.assertions(3);
  const s = {
    name: "lastTesting",
    email: "sala@gmail.com"
  };
  const sub = await funcs.createSubscriber(s);
  const subID = sub.data.data._id;

  const getS = Subscriber.findOne({ _id: subID });
  expect(sub.data.data.name).toEqual(s.name);
  expect(sub.data.data.email).toEqual(s.email);

  expect(getS).toBeDefined();

  done();
});
