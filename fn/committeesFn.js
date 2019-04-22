const axios = require("axios");
const functions = {
  getcommittees: async () => {
    const comm = await axios.get("http://localhost:6000/api/committee/");
    return comm;
    // try{
    //     return await axios.get('http://localhost:6000/api/committee/')
    // }
    // catch(error){
    //     console.log(error)
    // }
  },

  getcommitteesById: async id => {
    const comm = await axios.get("http://localhost:6000/api/committee/" + id);
    return comm;
  },
  createCommmittee: async body => {
    try {
      console.log("in create");
      const response = await axios.post(
        "http://localhost:6000/api/committee/",
        body
      );
      console.log(JSON.stringify(response, null, 2));
      return response;
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  },

  deleteCommittees: async id => {
    try {
      const comm = await axios.delete(
        `http://localhost:6000/api/committee/` + id
      );
      console.log(comm);
      return comm;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
