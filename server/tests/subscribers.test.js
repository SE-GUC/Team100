const funcs = require("../fn/Subscriberfn");

test("Get all subscribers", async done => {
  expect.assertions(1);
  const response = await funcs.getSubscriber();
  expect(response.data.data.length).toBe(27);
  done();
});
test("Get a subscriber", async done => {
  expect.assertions(1);
  id = "5c94d97acf74db284a9de796";
  const subscriber = await funcs.getASubscriber(id);
  expect(subscriber.data.Subscriber._id).toEqual(id);
  done();
});
test("create a subscriber", async done => {
  expect.assertions(2);
  const testSubscriber = {
    name: "ahg",
    email: "5ay"
  };
  const subs = await funcs.createSubscriber(testSubscriber);
  expect(subs.data.data.name).toEqual("ahg");
  expect(subs.data.data.email).toEqual("5ay");
  done();
});
