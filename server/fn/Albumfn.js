const axios = require("axios");

const functions = {
  getAllAlbums: async () => {
    const albums = await axios.get(`http://localhost:6000/api/albums/`);
    return albums;
  },
  deleteCertainAlbum: async id => {
    const album = await axios.delete(`http://localhost:6000/api/albums/${id}`);
    return album;
  },
  updateCertainAlbum: async id => {
    const album = await axios.put(`http://localhost:6000/api/albums/${id}`, {
      title: "Session 12",
      description: "abcde",
      photo: ["5c96009d01119d16989aebfd"]
    });
    return album;
  },
  postAlbum: async body => {
    try {
      const album = await axios.post(`http://localhost:6000/api/albums/`, {
        title: "Event 12",
        description: "fcghbj",
        photo: ["5c96009d01119d16989aebfc"]
      });
      return album;
    } catch (error) {
      console.log(error);
    }
  },
  getCertainAlbum: async id => {
    try {
      const album = await axios.get(`http://localhost:6000/api/albums/${id}`);
      return album;
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = functions;
