const funcs = require("../fn/FormTemplatesFn");

test("get certain form template", async done => {
  expect.assertions(1);
  id = "5c9f77b288d18528fff4e0d4";
  const form = await funcs.getCertainFormTemplate(id);
  //console.log(achievement.data.Achievement._id);
  expect(form.data.FormTemplate._id).toEqual(id);
  done();
});

test("get all from templates", async done => {
  expect.assertions(1);
  const response = await funcs.getAllFormTemplates();
  const resLength = response.data.data.length;
  expect(response.data.data.length).toBe(5);
  done();
});
test(`delete a certain FormTemplate `, async done => {
  const r1 = await funcs.getAllFormTemplates();
  const res = r1.data.data.length - 1;
  const r2 = await funcs.getAllFormTemplates();
  expect(r2.data.data.length).toEqual(res + 1);
  done();
});
