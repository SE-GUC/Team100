//
const express =require('express');
const router=express.Router();

const member = [
    { id: "1", name: "Yomna", email: "yomna@gmail.com", password: "12345" , major:"law", telephone: "22222" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",body:"Fundraising",admin:"0"},
    { id: "2", name: "Dina", email: "dina@gmail.com", password: "1234" , major:"met", telephone: "33333" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",body:"Marketing",admin:"0"},
    { id: "3", name: "Dalia", email: "dalia@gmail.com", password: "abcd" , major:"bi", telephone: "111111" , photo:"https://www.pexels.com/search/kitten/",club:"TIQ",body:"Marketing",admin:"0"}
    
];

const admin = [
    { id: "4", name: "Mariam", email: "mariam@gmail.com", password: "12345" , major:"law", telephone: "22222" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",type:"Marketing"},
    { id: "5", name: "Doha", email: "doha@gmail.com", password: "1234" , major:"met", telephone: "33333" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",type:"Security Council"},
    { id: "6", name: "Ziad", email: "ziad@gmail.com", password: "12345" , major:"bi", telephone: "111111" , photo:"https://www.pexels.com/search/kitten/",club:"VGS",type:"Game Development"}
   
];

const viewer = [
    { id: "7", name: "Yara", email: "yara@gmail.com", password: "12345" , major:"law", telephone: "22222" , photo:"https://www.pexels.com/search/kitten/", uni_type:"GUC"},
    { id: "8", name: "Menna", email: "menna@gmail.com", password: "abcd" , major:"met", telephone: "33333" , photo:"https://www.pexels.com/search/kitten/",uni_type:"AUC"},
    { id: "9", name: "Marwan", email: "marwan@gmail.com", password: "12345" , major:"bi", telephone: "111111" , photo:"https://www.pexels.com/search/kitten/",uni_type:"GUC"}
   
];

// as a user i should be able to read my information

router.get('/viewers/:id', (req, res) => {
    const id = req.params.id
    const result = viewer.find(viewers => viewers.id === id)
    res.send(result)
})

router.get('/admins/:id', (req, res) => {
    const id = req.params.id
    const a = admins.find(admins => admins.id === id)
    res.send(a)

})

router.get('/members/:id', (req, res) => {
    const id = req.params.id
    const m = members.find(members => members.id === id)
    res.send(m)
})
 
module.exports=router