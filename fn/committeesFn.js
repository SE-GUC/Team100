const axios = require('axios');
const functions={
    getcommittees: async ()=>{
            const comm= await axios.get('http://localhost:6000/api/committee/')
            return comm
            // try{
            //     return await axios.get('http://localhost:6000/api/committee/')
            // }
            // catch(error){
            //     console.log(error)
            // }
     
    },
    createCommmittee: async(body) =>{
try{
    const response = await axios.post('http://localhost:6000/api/committee/',body)
    return response
}catch (error){
    console.log(error)
}
    },
    updateCommittee: async(body)=>{
        try{
            const r= await axios.put('http://localhost:6000/api/committee/HR',body)
            return r
        }catch (error){
            console.log(error)
        }

    },

deleteCommittees: async(body)=>{
    try{
        const resp=await axios.delete ('http://localhost:6000/api/committee/commTest',body)
        return resp
    }catch(error){
        console.log(error)
    }

},
};
module.exports = functions;