const funcs = require("../fn/Feedbackfn");

test("Create feedback", async done => {
  expect.assertions(4);
  const result = await funcs.postFeedback();
  console.log(result);
  expect(result.data.Feedback.text).toEqual("123");
  expect(result.data.Feedback.event).toEqual("fcgh5c95382be4793067bcc3f232");
  expect(result.data.Feedback.user).toEqual("5c94fbb3d50a3626620b38c9");
  expect(result.data.Feedback.anonymous).toEqual(true);
  done();
});

test("Get certain feedback", async done => {
  expect.assertions(1);
  const id = "5c9526e90e68c6675c06d3c6";
  const result = await funcs.getCertainFeedback(id);
  expect(result.data.Feedback.event).toEqual(id);
});
