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
  createFaq: async body => {
    try {
      return (response = await axios.post(
        "http://localhost:6000/api/faqs/",
        body
      ));
    } catch (error) {
      console.log(error);
    }
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
  deleteFaqs: async id => {
    const FAQ = await axios.delete("http://localhost:6000/api/faqs/" + id);
    return FAQ;
  },
  // get all faqs
  getFaqs: async () => {
    const FAQ = await axios.get("http://localhost:6000/api/faqs");
    return FAQ;
  }
};
module.exports = functions;
