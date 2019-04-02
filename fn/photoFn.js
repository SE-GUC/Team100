const axios = require("axios");
const functions = {
  createPhoto: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/photo/",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  deletePhoto: async body => {
    try {
      const response = await axios.delete(
        "http://localhost:6000/api/photo/:link",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getphoto: async () => {
    const photo = await axios.get(
      "http://localhost:6000/api/photo/www.hgurjshg.com"
    );
    return photo;
  },

  UpdatePhoto: async body => {
    try {
      const response = await axios.put(
        "http://localhost:6000/api/photo/:link",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
