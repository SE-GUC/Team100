const axios = require("axios");
const functions = {
  getEvent: async (id) => {
    try {
      const response = await axios.get('http://localhost:6000/api/events/eventbyid/:id');
      return response;
    }
    catch (error) {
      console.log(error);
    }
  },

  currentEvents: async () => {
    const response = await axios.get(
      "http://localhost:6000/api/events/timeline/current"
    );
    return response;
  }
};
module.exports = functions;
