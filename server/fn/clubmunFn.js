const axios = require("axios");

const functions = {
  // get a certain clubmun vision with ID
  getVision: async id => {
    const k = await axios.get(
      `http://localhost:6000/api/clubmuns/vision/5c95192b2e07ab319cf2a77b`
    );
    return k;
  },
  // get a certain clubmun description with ID
  getDescription: async id => {
    const k = await axios.get(
      `http://localhost:6000/api/clubmuns/description/5c95192b2e07ab319cf2a77b`
    );
    return k;
  },
  // get a certain clubmun mission with ID
  getMission: async () => {
    const k = await axios.get(
      `http://localhost:6000/api/clubmuns/mission/5c95192b2e07ab319cf2a77b`
    );
    return k;
  },

  updatedescription: async () => {

    const d = await axios.put(
      " http://localhost:6000/api/clubmuns/description/5c95192b2e07ab319cf2a77b",
      {
        description: "updated description",
      }
    )
    return d
  },
  updatemission: async (id) => {
    try {
      id = "5c95192b2e07ab319cf2a77b"
      const m = await axios.put(`http://localhost:6000/api/clubmuns/${id}`,
        { mission: "new mission" })
      return m
    }
    catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
