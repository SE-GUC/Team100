const axios = require("axios");
const functions = {
  getComingSoonEvent: async () => {
    const response = await axios.get(
      "http://localhost:6000/api/events/timeline/f_soon"
    );
    return response;
  },
  getEventRate: async id => {
    try {
      const eventRate = await axios.get(
        `http://localhost:6000/api/events/rate/${id}`
      );
      return eventRate;
    } catch (error) {
      console.log(error);
    }
  },
  rateEvent: async () => {
    const rate = await axios.put(
      "http://localhost:6000/api/events/rate/5c9546969566a387d47f9001",
      {
        rate: 5
      }
    );
    return rate;
  }
};
module.exports = functions;
