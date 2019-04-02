const axios = require("axios");
const functions = {
  getComingSoonEvent: async () => {
    const response = await axios.get(
      "http://localhost:6000/api/events/timeline/f_soon"
    );
    return response;
  },
  getEventRate: async id => {
    try {
      const eventRate = await axios.get(
        `http://localhost:6000/api/events/rate/${id}`
      );
      return eventRate;
    } catch (error) {
      console.log(error);
    }
  },
  rateEvent: async () => {
    const rate = await axios.put(
      "http://localhost:6000/api/events/rate/5c9546969566a387d47f9001",
      {
        rate: 5
      }
    );
    return rate;
  },
  getCertainEvent: async (id) => {
    try {
      return response = await axios.get(`http://localhost:6000/api/events/${id}`);
    } catch (error) {
      console.log(error);
    }
  },

  deleteEvents: async (id) => {
    try {
      return response = await axios.delete(`http://localhost:6000/api/events/${id}`);
    } catch (error) {
      console.log(error);
    }
  },


  updateEvents: async (id) => {
    const ev = await axios.put(
      "http://localhost:6000/api/events/5c953831e4793067bcc3f233",
      {
        description: "update description",

      }
    )
    return ev
  },

  createEvents: async (body) => {
    try {
      return response = await axios.post('http://localhost:6000/api/events/', body);
    } catch (error) {
      console.log(error);
    }
  },
  getEvent: async (id) => {
    try {
      id = "5c953831e4793067bcc3f233"
      const response = await axios.get(`http://localhost:6000/api/events/eventbyid/${id}`);
      return response;
    }
    catch (error) {
      console.log(error);
    }
  },

  currentEvents: async () => {
    const response = await axios.get(
      "http://localhost:6000/api/events/timeline/current"
    );
    return response;
  }


};
module.exports = functions;
