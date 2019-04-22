const axios = require("axios");
const functions = {
  createAP: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/libraries/",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getallAp: async () => {
    const response = await axios.get("http://localhost:6000/api/libraries/");
    return response;

  },

  getAP: async body => {
    try {
      const response = await axios.get(
        "http://localhost:6000/api/libraries/:year",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  deleteAP: async body => {
    try {
      const response = await axios.delete(
        "http://localhost:6000/api/libraries/:year",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = functions;
