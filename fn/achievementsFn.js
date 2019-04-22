const axios = require("axios");
const functions = {
  createAchievements: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/achievements/",
        body
      );
      console.log("done");
      //  console.log(response);
      return response;
    } catch (error) {
      console.log("ERROR");
      // console.log(error);
    }
  },

  deleteAchievement: async id => {
    try {
      const ach = await axios.delete(
        `http://localhost:6000/api/achievements/` + id
      );
      return ach;
    } catch (error) {
      // console.log(error);
    }
  },

  getAllAchievements: async () => {
    try {
      return await axios.get("http://localhost:6000/api/achievements/");
    } catch (error) {
      //   console.log(error);
    }
  }
};
module.exports = functions;