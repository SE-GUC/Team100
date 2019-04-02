const axios = require("axios")
const functions = {

    updatedescription: async () => {

        const d = await axios.put(
            " http://localhost:6000/api/clubmuns/description/5c95192b2e07ab319cf2a77b",
            {
                description: "updated description",
            }
        )
        return d
    },
    updatemission: async (id) => {
        try {
            const ev = await axios.put("http://localhost:6000/api/api/clubmuns/5c95192b2e07ab319cf2a77b", { mission: "new mission" })
            return ev
        }
        catch (error) {
            console.log(error);
        }
    }


}
module.exports = functions