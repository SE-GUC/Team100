const axios = require("axios")
const functions = {
  createAchievements: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/achievements/",
        body
      )
      return response
    } catch (error) {
      console.log(error)
    }
  },

  deleteAchievement: async id => {
    try {
      const ach = await axios.delete(
        `http://localhost:6000/api/achievements/${id}`
      )
      return ach
    } catch (error) {
      console.log(error)
    }
  },

  updateAchievement: async () => {
    const ach = await axios.put(
      "http://localhost:6000/api/achievements/5c9fd8686436535b34c86182",
      {
        description: "update description",
        photo: "sprint33.com"
      }
    )
    return ach
  }
};
getCertainAchievement: async (id) => {
  try {
   const k= await axios.get(`http://localhost:6000/api/achievements/${id}`);
    return k
  } catch (error) {
    console.log(error);
  }
};

getAllAchievements: async () => {
  try {
    return await axios.get("http://localhost:6000/api/achievements/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = functions
