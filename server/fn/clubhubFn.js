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
  updateBriefDescription: async () => {
    const desc = await axios.put(
      "http://localhost:6000/api/club_hub/5c9516bd00bed630647f8bfa",
      {
        brief_description: "updated description 2"
      }
    );
    return desc;
  }
};
module.exports = functions;
