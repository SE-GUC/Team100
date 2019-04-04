const axios = require("axios");
const functions = {
  getSubscriber: async () => {
    const response = await axios.get("http://localhost:6000/api/subscribers/");
    return response;
  },
  getASubscriber: async body => {
    try {
      const response = await axios.get(
        `http://localhost:6000/api/subscribers/${id}`,
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  createSubscriber: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/subscribers/",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
