const axios = require("axios");
const functions = {
  getComingSoonEvent: async () => {
    const response = await axios.get(
      "http://localhost:6000/api/events/timeline/f_soon"
    );
    return response;
  }
};
module.exports = functions;
