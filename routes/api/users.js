//
const express =require('express');
const router=express.Router();

const member = [
    { id: "1", name: "Yomna", email: "yomna@gmail.com", password: "12345" , major:"law", telephone: "22222" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",body:"Fundraising",admin:"0"},
    { id: "2", name: "Dina", email: "dina@gmail.com", password: "1234" , major:"met", telephone: "33333" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",body:"Marketing",admin:"0"},
    { id: "3", name: "Dalia", email: "dalia@gmail.com", password: "abcd" , major:"bi", telephone: "111111" , photo:"https://www.pexels.com/search/kitten/",club:"TIQ",body:"Marketing",admin:"0"}
    
];

const admin = [
    { id: "10", name: "Mariam", email: "mariam@gmail.com", password: "12345" , major:"law", telephone: "22222" , photo:"https://www.pexels.com/search/kitten/",club:"MUN",type:"Marketing"},
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
 

router.get('/viewer_info/:id', (req, res) => {
    const viewid = req.params.id
    const x = viewers.find(x => x.id === viewid)
    res.send({data: x})
})
router.get('/admin_info/:id', (req, res) => {
    const adminid = req.params.id
    const x = admins.find(x => x.id === adminid)
    res.send({data: x})
})
router.get('/member_info/:id', (req, res) => {
    const memberid = req.params.id
    const x = members.find(x => x.id === memberid)
    res.send({data: x})
})


router.post('/create_member/', (req, res) => {
   // const nid = req.body.id
    const n_name = req.body.name
    const n_email = req.body.email
    const n_password = req.body.password
    const n_major = req.body.major
    const n_telephone = req.body.telephone
    const n_photo = req.body.photo
    const n_club = req.body.club
    const n_committee= req.body.committee
    const n_admin = req.body.admin

    const schema = {
		name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().min(5).required(),
        major:Joi.string().required(),
        telephone: Joi.number(),
        photo: Joi.string(),
        club: Joi.string(),
        committee:Joi.string(),
        admin: Joi.boolean()

	}
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });


    const member = {
        id: members.length + 1,
        name: n_name,
        email: n_email,
        password: n_password,
        major: n_major,
        telephone: n_telephone,
        photo: n_photo,
        club: n_club,
        committee:n_committee,
        admin:n_admin
    }
    members.push(member)
    res.send(members)
})


router.post('/create_admin/', (req, res) => {
   // const na_id = req.body.id
    const na_name = req.body.name
    const na_email = req.body.email
    const na_password = req.body.password
    const na_major = req.body.major
    const na_telephone = req.body.telephone
    const na_photo = req.body.photo
    const na_club = req.body.club
    const na_committee= req.body.committee


    const schema = {
		name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().min(5).required(),
        major:Joi.string().required(),
        telephone: Joi.number(),
        photo: Joi.string(),
        club: Joi.string(),
        committee: Joi.string()

	}
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });


    const admin = {
        id: admins.length + 1,
        name: na_name,
        email: na_email,
        password: na_password,
        major: na_major,
        telephone: na_telephone,
        photo: na_photo,
        club: na_club,
        committee:na_committee
    }
    admins.push(admin)
    res.send(admins)
})


router.post('/create_viewer/', (req, res) => {
    //const nv_id = req.body.id
    const nv_name = req.body.name
    const nv_email = req.body.email
    const nv_password = req.body.password
    const nv_major = req.body.major
    const nv_telephone = req.body.telephone
    const nv_photo = req.body.photo
    const nv_uni = req.body.uni_type
   

    const schema = {
		name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        password: Joi.string().min(5).required(),
        major:Joi.string().required(),
        telephone: Joi.number(),
        photo: Joi.string(),
        uni_type: Joi.string()
       

	}
    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send({ error: result.error.details[0].message });


    const viewer = {
        id: viewers.length + 1,
        name: nv_name,
        email: nv_email,
        password: nv_password,
        major: nv_major,
        telephone: nv_telephone,
        photo: nv_photo,
        uni_type: nv_uni
       
    }
    viewers.push(viewer)
    res.send(viewers)
})

router.delete('/delete_viewer/:id', (req, res) => {
    const vid = req.params.id
    const x = viewers.filter(x => x.id === vid )[0]
    const index = viewers.indexOf(x)
    if(x && index!==null){
        viewers.splice(index,1)
        res.send(viewers)
    }
    else{
        res.status(400).send({ err: 'Invalid value for viewer id' });   
    }}
)

router.delete('/delete_admin/:id', (req, res) => {
    const aid = req.params.id
    const x = admins.filter(x => x.id === aid )[0]
    const index = admins.indexOf(x)
    if(x && index!==null){
        admins.splice(index,1)
        res.send(admins)
    }
    else{
        res.status(400).send({ err: 'Invalid value for admin id' });   
    }

}
)

router.delete('/delete_member/:id', (req, res) => {
    const mid = req.params.id
    const x = members.filter(x => x.id === mid )[0]
    const index = members.indexOf(x)
    if(x && index!==null){
        members.splice(index,1)
        res.send(members)
    }
    else{
        res.status(400).send({ err: 'Invalid value for member id' });   
    }

}
)


router.put('/update_member/:id', (req, res) => {
    const memb_id = req.params.id
    const up_member = members.filter(up_member => up_member.id === memb_id)[0]

if(req.body.name!==undefined){
    if(typeof req.body.name==='string'){
        members.name= req.body.name
    }
    else{
        res.status(400).send({ err: 'Invalid data type for name' });   
    }
}

if(req.body.major!==undefined){
    if(typeof req.body.major==='string'){
        members.major= req.body.major
    }
    else{
        res.status(400).send({ err: 'Invalid data type for major' });   
    }
}

if(req.body.email!==undefined){
    if(typeof req.body.email==='string'){
        members.email= req.body.email
    }
    else{
        res.status(400).send({ err: 'Invalid data type for email' });   
    }
}
if(req.body.telephone!==undefined){
    if(typeof req.body.telephone==='number'){
        members.telephone= req.body.telephone
    }
    else{
        res.status(400).send({ err: 'Invalid data type for telephone' });   
    }
}
if(req.body.photo!==undefined){
    if(typeof req.body.photo==='string'){
        members.photo= req.body.photo
    }
    else{
        res.status(400).send({ err: 'Invalid data type for photo' });   
    }
}

if(req.body.club!==undefined){
    if(typeof req.body.club==='string'){
        members.club= req.body.club
    }
    else{
        res.status(400).send({ err: 'Invalid data type for club' });   
    }
}


if(req.body.committee!==undefined){
    if(typeof req.body.committee==='string'){
        members.committee= req.body.committee
    }
    else{
        res.status(400).send({ err: 'Invalid data type for committee' });   
    }
}

if(req.body.admin!==undefined){
    if(typeof req.body.admin==='boolean'){
        members.admin= req.body.admin
    }
    else{
        res.status(400).send({ err: 'Invalid data type for admin' });   
    }
}
const index= members.indexOf(up_member)
if(up_member&&index !== null){
const keys = Object.keys(req.body)
keys.forEach(key=> {
    up_member[key] = req.body[key]
})
members[index]= up_member
res.json(members[index]) 
}
else{
    res.status(400).send({ err: 'Invalid value for member id' });   

}
    

}
)

router.put('/update_admin/:id', (req, res) => {
    const admin_id = req.params.id
    const up_admin = admins.filter(up_admin => up_admin.id === admin_id)[0]

    if(req.body.name!==undefined){
        if(typeof req.body.name==='string'){
            admins.name= req.body.name
        }
        else{
            res.status(400).send({ err: 'Invalid data type for name' });   
        }
    }

    if(req.body.major!==undefined){
        if(typeof req.body.major==='string'){
            admins.major= req.body.major
        }
        else{
            res.status(400).send({ err: 'Invalid data type for major' });   
        }
    }

    if(req.body.email!==undefined){
        if(typeof req.body.email==='string'){
            admins.email= req.body.email
        }
        else{
            res.status(400).send({ err: 'Invalid data type for email' });   
        }
    }
    if(req.body.telephone!==undefined){
        if(typeof req.body.telephone==='number'){
            admins.telephone= req.body.telephone
        }
        else{
            res.status(400).send({ err: 'Invalid data type for telephone' });   
        }
    }
    if(req.body.photo!==undefined){
        if(typeof req.body.photo==='string'){
            admins.photo= req.body.photo
        }
        else{
            res.status(400).send({ err: 'Invalid data type for photo' });   
        }
    }

    if(req.body.club!==undefined){
        if(typeof req.body.club==='string'){
            admins.club= req.body.club
        }
        else{
            res.status(400).send({ err: 'Invalid data type for club' });   
        }
    }
    

    if(req.body.committee!==undefined){
        if(typeof req.body.committee==='string'){
            admins.body= req.body.committee
        }
        else{
            res.status(400).send({ err: 'Invalid data type for committee' });   
        }
    }

    const index= admins.indexOf(up_admin)
    if(up_admin&&index !== null){
    const keys = Object.keys(req.body)
    keys.forEach(key=> {
        up_admin[key] = req.body[key]
    })
    admins[index]= up_admin
    res.json(admins[index]) 
    }
    else{
        res.status(400).send({ err: 'Invalid value for admin id' });   

    }
}
)
router.put('/update_viewer/:id', (req, res) => {
    const viewer_id = req.params.id
    const up_viewer = viewers.filter(up_viewer => up_viewer.id === viewer_id)[0]

    if(req.body.name!==undefined){
        if(typeof req.body.name==='string'){
            viewers.name= req.body.name
        }
        else{
            res.status(400).send({ err: 'Invalid data type for name' });   
        }
    }

    if(req.body.major!==undefined){
        if(typeof req.body.major==='string'){
            viewers.major= req.body.major
        }
        else{
            res.status(400).send({ err: 'Invalid data type for major' });   
        }
    }

    if(req.body.email!==undefined){
        if(typeof req.body.email==='string'){
            viewers.email= req.body.email
        }
        else{
            res.status(400).send({ err: 'Invalid data type for email' });   
        }
    }
    if(req.body.telephone!==undefined){
        if(typeof req.body.telephone==='number'){
            viewers.telephone= req.body.telephone
        }
        else{
            res.status(400).send({ err: 'Invalid data type for telephone' });   
        }
    }
    if(req.body.photo!==undefined){
        if(typeof req.body.photo==='string'){
            viewers.photo= req.body.photo
        }
        else{
            res.status(400).send({ err: 'Invalid data type for photo' });   
        }
    }

    if(req.body.uni_type!==undefined){
        if(typeof req.body.uni_type==='string'){
            viewers.uni_type= req.body.uni_type
        }
        else{
            res.status(400).send({ err: 'Invalid data type for uni' });   
        }
    }
    
   

    const index= viewers.indexOf(up_viewer)
    if(up_viewer&&index !== null){
    const keys = Object.keys(req.body)
    keys.forEach(key=> {
        up_viewer[key] = req.body[key]
    })
    viewers[index]= up_viewer
    res.json(viewers[index]) }
    else{
        res.status(400).send({ err: 'Invalid value for viewer id' });   

    }
}
)





module.exports=router