
const funcs = require("../fn/RecruitmentFormFn");

test("Get all forms", async done => {
  expect.assertions(1);
  const response = await funcs.getRow();
  expect(response.data.data.length).toBe(7);
  done();
});


test("Get a recruitment form", async done => {
  expect.assertions(1);
  id = "5c9fba7a64ca3d3ca05ade0b";
  const form = await funcs.getAForm(id);
  expect(form.data.RecruitmentForm._id).toEqual(id);
  done();
});

test("Create a recruitment form", async done => {
  expect.assertions(10);
  const result = await funcs.postForm();
  expect(result.data.data.name).toEqual("dina");
  expect(result.data.data.birthdate).toEqual("2014-12-31T22:00:00.000Z");
  expect(result.data.data.email).toEqual("abc@abc.com");
  expect(result.data.data.major).toEqual("BI");
  expect(result.data.data.telephone_number).toEqual(123456);
  expect(result.data.data.Year_of_Study).toEqual("2016-01-01T00:00:00.000Z");
  expect(result.data.data.Means_of_Transportation).toEqual("Bus");
  expect(result.data.data.Council_Office1).toEqual("ICJ");
  expect(result.data.data.Council_Office2).toEqual("CL");
  expect(result.data.data.Previous_Experience).toEqual("None");
  done();
});