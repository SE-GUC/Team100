const axios = require("axios");
const functions = {
  deleteCertainMessage: async id => {
    try {
      const msg = await axios.delete(
        `http://localhost:6000/api/messages/${id}`
      );
      console.log(msg);
      return msg;
    } catch (error) {
      //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(error);
    }
  },

  getCertainMessage: async committee => {
    try {
      const comm = await axios.get(
        `http://localhost:6000/api/messages/${committee}`
      );
      return comm;
    } catch (error) {
      console.log(error);
    }
  },

  getAllMessages: async () => {
    try {
      return await axios.get("http://localhost:6000/api/messages/");
    } catch (error) {
      //console.log("asaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      console.log(error);
    }
  },

  createMessage: async body => {
    try {
      const response = await axios.post(
        "http://localhost:6000/api/messages/",
        body
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
