const funcs = require("../fn/Eventfn");

test("Get comming soon events", async done => {
  expect.assertions(1);
  const response = await funcs.getComingSoonEvent();
  expect(response.data.data.length).toEqual(1);
  done();
});
