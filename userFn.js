const axios = require('axios');
const functions = {
    getUsers: async () => {
        const users = await axios.get('http://localhost:6000/api/users/')
        return users
    },

    getaUser: async (id) => {
        try {
            const user = await axios.get(`http://localhost:6000/api/users/get_user/${id}`);
            //console.log(user);
            return user
        }
        catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (id) => {
        try {
            const u = await axios.delete(`http://localhost:6000/api/users/delete_user/${id}`);
            return u
        }
        catch (error) {
            console.log(error);
        }
    },
    
}
module.exports = functions;