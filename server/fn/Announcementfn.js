const axios = require("axios");

const functions = {
  getAnnouncements: async () => {
    const response = await axios.get(
      "http://localhost:6000/api/announcements/"
    );
    return response;
  },
  getAnAnnouncement: async id => {
    try {
      const response = await axios.get(
        `http://localhost:6000/api/announcements/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deleteAnnouncement: async id => {
    try {
      const response = await axios.delete(
        `http://localhost:6000/api/announcements/${id}`
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  createAnnouncement: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/announcements/",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateAnnouncement: async body => {
    try {
      const response = await axios.put(
        "http://localhost:6000/api/announcements/5c950b25d6d3eb29fe027502",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
