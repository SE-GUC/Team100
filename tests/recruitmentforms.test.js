
const funcs = require("../fn/RecruitmentFormFn");

test("Get all forms", async done => {
  expect.assertions(1);
  const response = await funcs.getRow();
  expect(response.data.data.length).toBe(2);
  done();
});


test("Get a recruitment form", async done => {
  expect.assertions(1);
  id = "5c9fba7a64ca3d3ca05ade0b";
  const form = await funcs.getAForm(id);
  expect(form.data.RecruitmentForm._id).toEqual(id);
  done();
});