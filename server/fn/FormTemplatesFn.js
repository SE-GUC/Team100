const axios = require("axios");
const functions = {
  getAllFormTemplates: async () => {
    try {
      return await axios.get("http://localhost:6000/api/FormTemplates/");
    } catch (error) {
      console.log(error);
    }
  },

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

  deleteForm: async () => {
    const form = await axios.delete(
      "http://localhost:6000/api/FormTemplates/5c9f813ed408652bdc51ca6b"
    );
    return form;
  },
};
module.exports = functions;
