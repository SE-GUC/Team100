const axios = require("axios");
const functions = {
  getRow: async () => {
    const rows = await axios.get("http://localhost:6000/api/recruitmentforms/");
    return rows;
  },

  getAForm: async id => {
    try {
      const response = await axios.get(
        `http://localhost:6000/api/RecruitmentForms/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = functions;
