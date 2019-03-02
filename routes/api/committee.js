const express =require('express');
const router=express.Router();

const committee = [
    { name: "Marketing", description:"Responsible for Marketing Campaigns", page:"www.page.com", events:["recruitment","opening"],team_members:["Yomna","Dina"]},
    { name: "Security Council", description:"Simulating UN SC", page:"www.page.com", events:["conference","sessions"],team_members:["Dalia"]}

];

router.get('/view_committee/', (req, res) => {
   // const id=req.params.id
     const name = req.body.name
     const r = committee.find(committee => committee.name === name)
    res.send(r)
})
module.exports=router