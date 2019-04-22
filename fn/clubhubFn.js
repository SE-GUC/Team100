const axios = require("axios");
const functions = {
  getBriefDescription: async id => {
    try {
      const club = await axios.get(`http://localhost:6000/api/club_hub/${id}`);
      return club;
    } catch (error) {
      console.log(error);
    }
  },

  getClubHub: async () => {
    const r = await axios.get("http://localhost:6000/api/club_hub/");
    return r;
  },

  createClubHub: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/club_hub/",
        body
      );
      console.log(JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  }
};
module.exports = functions;