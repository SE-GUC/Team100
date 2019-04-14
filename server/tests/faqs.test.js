const funcs = require("../fn/faqsFn");

test(`get a certain faq `, async done => {
  const response = await funcs.getCertainFaqs();
  expect(response.data.data.question).toEqual("who is the speaker today?");
  expect(response.data.data.answer).toEqual("Ahmed desoky");
  done();
}),
  test(`get all Faqs`, async done => {
    const response = await funcs.getFaqs();
    const res = response.data.data.length;
    expect(response.data.data.length).toBe(res);
    done();
  }),
  test(`create a new faq`, async done => {
    expect.assertions(2);
    const response = await funcs.createFaq();
    console.log(response);
    expect(response.data.Faq.question).toEqual("who is the speaker today?");
    expect(response.data.Faq.answer).toEqual("Ahmed desoky");
    done();
  }),
  test(`update a question of  Faq`, async done => {
    expect.assertions(1);
    const response = await funcs.updateQuestionFaqs();
    expect(response.data.Faq.question).toEqual(
      "what are the committees in MUN club?"
    );
    done();
  }),
  test(`update an answer of  Faq`, async done => {
    expect.assertions(1);
    const response = await funcs.updateAnswerFaqs();
    expect(response.data.Faq.answer).toEqual("design and R&D");

    done();
  });
test(`delete a certain faq `, async done => {
  const r1 = await funcs.getFaqs();
  const res = r1.data.data.length - 1;
  const response = await funcs.deleteFaqs();
  const r2 = await funcs.getFaqs();
  expect(r2.data.data.length).toEqual(res + 1);
  done();
});
