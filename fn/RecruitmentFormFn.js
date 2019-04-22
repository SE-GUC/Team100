const axios = require("axios");
const functions = {
  getRow: async () => {
    const rows = await axios.get("http://localhost:6000/api/recruitmentforms/");
    return rows;
  },
  getforms: async () => {
    const form = await axios.get("http://localhost:6000/api/recruitmentforms/");
    return form;
  },

  getAForm: async id => {
    try {
      const response = await axios.get(
        `http://localhost:6000/api/RecruitmentForms/` + id
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  postForm: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/RecruitmentForms/",
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
