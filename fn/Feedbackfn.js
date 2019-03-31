const axios = require("axios");

const functions = {
  getCertainFeedback: async id => {
    try {
      const feedback = await axios.get(
        `http://localhost:6000/api/feedbacks/${id}`
      );
      return feedback;
    } catch (error) {
      console.log(error);
    }
  },
  postFeedback: async () => {
    try {
      const feedback = await axios.post(
        `http://localhost:6000/api/feedbacks/`,
        {
          text: "good",
          event: "fcgh5c95382be4793067bcc3f232",
          user: "5c94fbb3d50a3626620b38c9",
          anonymous: true
        }
      );
      return feedback;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
