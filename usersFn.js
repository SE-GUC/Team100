const axios = require('axios');
const functions = {
    getUsers: async () => {
        const users = await axios.get('http://localhost:6000/api/users/')
        return users
    },

    getaUser: async (id) => {
        try {
            const user = await axios.get('http://localhost:6000/api/users/get_user/${id}');
            //console.log(user);
            return user
        }
        catch (error) {
            console.log(error);
        }
    },
    registeraUser: async (body) => {
        try {
            const u = await axios.post('http://localhost:6000/api/users/register', body);
            return u;
        }
        catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (id) => {
        try {
            const u = await axios.delete('http://localhost:6000/api/users/delete_user/${id}');
            console.log(u);
            return u
        }
        catch (error) {
            console.log(error);
        }
    },
    updateUser: async(id,body)=>{
        try{
            const result= await axios.put('http://localhost:6000/api/users/update_user/${id}',body)
            return result
        }catch (error){
            console.log(error)
        }

    },

};
module.exports = functions;