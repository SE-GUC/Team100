const axios = require("axios");

const functions = {
  // get a certain faq with ID
  getCertainFaqs: async () => {
    const FAQ = await axios.get(
      "http://localhost:6000/api/faqs/5c9f4af3c55d4107b49d8525"
    );
    return FAQ;
  },
  // create a new Faq
  createFaq: async () => {
    const FAQ = await axios.post("http://localhost:6000/api/faqs", {
      question: "who is the speaker today?",
      answer: "Ahmed desoky"
    });
    return FAQ;
  },
  // update an answer of a faq
  updateAnswerFaqs: async () => {
    const FAQ = await axios.put(
      "http://localhost:6000/api/faqs/5c9e8593e437c122a80c5373",
      {
        answer: "design and R&D"
      }
    );
    return FAQ;
  },
  // update a question  of a faq
  updateQuestionFaqs: async () => {
    const FAQ = await axios.put(
      "http://localhost:6000/api/faqs/5c9e8593e437c122a80c5373",
      {
        question: "what are the committees in MUN club?"
      }
    );
    return FAQ;
  },
  // delete a faq
  deleteFaqs: async () => {
    const FAQ = await axios.delete(
      "http://localhost:6000/api/faqs/5c95eb0c70886d18f46efdc3"
    );
    return FAQ;
  },
  // get all faqs
  getFaqs: async () => {
    const FAQ = await axios.get("http://localhost:6000/api/faqs");
    return FAQ;
  }
};
module.exports = functions;
