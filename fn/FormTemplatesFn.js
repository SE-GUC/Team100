const axios = require("axios");
const functions = {
  getCertainFormTemplate: async id => {
    try {
      const k = await axios.get(
        `http://localhost:6000/api/FormTemplates/${id}`
      );
      return k;
    } catch (error) {
      console.log(error);
    }
  },

  getAllFormTemplates: async () => {
    try {
      return await axios.get("http://localhost:6000/api/FormTemplates/");
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
