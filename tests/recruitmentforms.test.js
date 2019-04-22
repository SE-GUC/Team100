const funcs = require("../fn/RecruitmentFormFn");
const RecruitmentForm = require("../models/RecruitmentForm");

test("get forms", async done => {
  const formsBefore = await funcs.getforms();

  const newForm = {
    name: "dina",
    email: "abc@abc.com",
    major: "BI",
    telephone_number: 123456,
    Year_of_Study: 2016,
    Means_of_Transportation: "Bus",
    Council_Office1: "ICJ",
    Council_Office2: "CL",
    Previous_Experience: "None"
  };
  const newF = await funcs.postForm(newForm);
  const FormID = newF.data.data._id;
  const getF = RecruitmentForm.findOne({ _id: FormID });
  const formsAfter = await funcs.getforms();

  expect(formsAfter.data.data.length).toEqual(formsBefore.data.data.length + 1);
  expect(getF).toBeDefined();

  done();
});

test("create forms", async done => {
  expect.assertions(10);

  const newForm = {
    name: "dina",
    email: "abc@abc.com",
    major: "BI",
    telephone_number: 123456,
    Year_of_Study: 2016,
    Means_of_Transportation: "Bus",
    Council_Office1: "ICJ",
    Council_Office2: "CL",
    Previous_Experience: "None"
  };
  const form = await funcs.postForm(newForm);
  const formID = form.data.data._id;

  const getF = RecruitmentForm.findOne({ _id: formID });
  expect(form.data.data.name).toEqual(newForm.name);
  expect(form.data.data.email).toEqual(newForm.email);
  expect(form.data.data.major).toEqual(newForm.major);
  expect(form.data.data.telephone_number).toEqual(newForm.telephone_number);
  expect(form.data.data.Year_of_Study).toEqual(newForm.Year_of_Study);
  expect(form.data.data.Means_of_Transportation).toEqual(
    newForm.Means_of_Transportation
  );
  expect(form.data.data.Council_Office1).toEqual(newForm.Council_Office1);
  expect(form.data.data.Council_Office2).toEqual(newForm.Council_Office2);
  expect(form.data.data.Previous_Experience).toEqual(
    newForm.Previous_Experience
  );

  expect(getF).toBeDefined();

  done();
});
