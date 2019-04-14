// const funcs = require("../fn/Feedbackfn");

// beforeAll(done => {
//   done();
// });


// test("Create feedback", async done => {
//   expect.assertions(4);
//   const result = await funcs.postFeedback();
//   expect(result.data.data.text).toEqual("good");
//   expect(result.data.data.event).toEqual("5c95468b9566a387d47f9000");
//   expect(result.data.data.user).toEqual("5c94fbb3d50a3626620b38c9");
//   expect(result.data.data.anonymous).toEqual(true);
//   done();
// });

// test("Get certain feedback", async (done) => {
//   expect.assertions(1);
//   const id = "5c9526e90e68c6675c06d3c6";
//   const result = await funcs.getCertainFeedback(id);
//   expect(result.data.data[0].event).toEqual(id);
//   done();
// });
