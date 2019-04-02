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
  },
  postForm: async body => {
    try {
      const rform = await axios.post(`http://localhost:6000/api/recruitmentforms/`, {
        "name": "dina",
        "birthdate": "1/1/2015",
        "email": "abc@abc.com",
        "major": "BI",
        "telephone_number": "123456",
        "Year_of_Study": "1/2/2016",
        "Means_of_Transportation": "Bus",
        "Council_Office1": "ICJ",
        "Council_Office2": "CL",
        "Previous_Experience": "None" 
      });
      return rform;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = functions;
