const funcs = require("../fn/faqsFn");
const Faq = require("../models/Faq");

test("get faqs", async done => {
  const faqBefore = await funcs.getFaqs();

  const newComm = {
    question: "testinggg",
    answer: "ndnlan"
  };
  const newF = await funcs.createFaq(newComm);
  const faqID = newF.data.Faq._id;
  const getF = Faq.findOne({ _id: faqID });
  const faqAfter = await funcs.getFaqs();

  expect(faqAfter.data.data.length).toEqual(faqBefore.data.data.length + 1);
  expect(getF).toBeDefined();

  // await funcs.deleteCommittees(CommID);

  done();
});

test("create FAQS", async done => {
  expect.assertions(3);
  const comm = {
    question: "when is ur next event?",
    answer: "next week"
  };
  const faq = await funcs.createFaq(comm);
  console.log(Error);
  const faqID = faq.data.Faq._id;
  console.log(faq.data.Faq);

  const getF = Faq.findOne({ _id: faqID });
  expect(faq.data.Faq.question).toEqual(comm.question);
  expect(faq.data.Faq.answer).toEqual(comm.answer);
  expect(getF).toBeDefined();

  await funcs.deleteFaqs(faqID);

  done();
});
