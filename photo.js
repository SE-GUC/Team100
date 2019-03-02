const express = require("express");
const Joi=require('joi');
const router=express.Router();

const member = [
  {
    id: "1",
    name: "Yomna",
    email: "yomna@gmail.com",
    password: "12345",
    major: "law",
    telephone: "22222",
    photo: "https://www.pexels.com/search/kitten/",
    club: "MUN",
    body: "Fundraising",
    admin: "0"
  },
  {
    id: "2",
    name: "Dina",
    email: "dina@gmail.com",
    password: "1234",
    major: "met",
    telephone: "33333",
    photo: "https://www.pexels.com/search/kitten/",
    club: "MUN",
    body: "Marketing",
    admin: "0"
  },
  {
    id: "3",
    name: "Dalia",
    email: "dalia@gmail.com",
    password: "abcd",
    major: "bi",
    telephone: "111111",
    photo: "https://www.pexels.com/search/kitten/",
    club: "TIQ",
    body: "Marketing",
    admin: "0"
  }
];
const admin = [
  {
    id: "4",
    name: "Mariam",
    email: "mariam@gmail.com",
    password: "12345",
    major: "law",
    telephone: "22222",
    photo: "https://www.pexels.com/search/kitten/",
    club: "MUN",
    type: "Marketing"
  },
  {
    id: "5",
    name: "Doha",
    email: "doha@gmail.com",
    password: "1234",
    major: "met",
    telephone: "33333",
    photo: "https://www.pexels.com/search/kitten/",
    club: "MUN",
    type: "Security Council"
  },
  {
    id: "6",
    name: "Ziad",
    email: "ziad@gmail.com",
    password: "12345",
    major: "bi",
    telephone: "111111",
    photo: "https://www.pexels.com/search/kitten/",
    club: "VGS",
    type: "Game Development"
  }
];

const viewer = [
  {
    id: "7",
    name: "Yara",
    email: "yara@gmail.com",
    password: "12345",
    major: "law",
    telephone: "22222",
    photo: "https://www.pexels.com/search/kitten/",
    uni_type: "GUC"
  },
  {
    id: "8",
    name: "Menna",
    email: "menna@gmail.com",
    password: "abcd",
    major: "met",
    telephone: "33333",
    photo: "https://www.pexels.com/search/kitten/",
    uni_type: "AUC"
  },
  {
    id: "9",
    name: "Marwan",
    email: "marwan@gmail.com",
    password: "12345",
    major: "bi",
    telephone: "111111",
    photo: "https://www.pexels.com/search/kitten/",
    uni_type: "GUC"
  }
];
const announcement = [
  {
    id: "1",
    tag: "#Event",
    date: "11/11/2011",
    description: "kittens event",
    created_by: "Mariam",
    videos: "https://www.pexels.com/search/kitten/",
    photos: "https://www.pexels.com/search/kitten/"
  },
  {
    id: "2",
    tag: "#fun",
    date: "10/10/2010",
    description: "Cinnabon in the Platform!",
    created_by: "Doha",
    videos: "https://www.pexels.com/search/kitten/",
    photos: "https://www.pexels.com/search/kitten/"
  },
  {
    id: "3",
    tag: "#google",
    date: "9/9/2019",
    description: "Google event brought to you by VGS",
    created_by: "Ziad",
    videos: "https://www.pexels.com/search/kitten/",
    photos: "https://www.pexels.com/search/kitten/"
  }
];
const faqs = [
  {
    id: "1",
    question: "what clubs are included in this hub?",
    answer: "GUCMUN,Nebny,VGS & TIQ"
  },
  {
    id: "2",
    question: "What university do these clubs belong to?",
    answer: "German University in Cairo"
  }
];
const club = [
  {
    name: "MUN",
    vision: "OK",
    mission: "lalala",
    description: "description",
    logo: "https://www.pexels.com/search/kitten/",
    brief_description: "brief description"
  },
  {
    name: "nebny",
    vision: "no",
    mission: "asad",
    description: "description",
    logo: "https://www.facebook.com/Nebny/",
    brief_description: "brief_description"
  },
  {
    name: "VGS",
    vision: "oke",
    mission: "teto",
    description: "description",
    logo: "https://www.pexels.com/search/kitten/",
    brief_description: "brief_description"
  },
  {
    name: "TIQ",
    vision: "lalalala",
    mission: "nononono",
    description: "description",
    logo: "https://www.pexels.com/search/kitten/",
    brief_description: "brief_description"
  }
];
const event = [
  {
    id: "1",
    club: "MUN",
    name: "10th anniversary",
    date: "11/11/2011",
    photo: "https://www.pexels.com/search/kitten/",
    title: "10th anniversary",
    feedback: ["gamed", "gamed awi"],
    place: "Uni",
    description: "description",
    committee: "Marketing"
  },
  {
    id: "2",
    club: "VGS",
    name: "recruitment",
    date: "11/11/2011",
    photo: "https://www.pexels.com/search/kitten/",
    title: "recruitment",
    feedback: ["not much", "lazeez"],
    place: "BUE",
    description: "description",
    committee: "HR"
  },
  {
    id: "3",
    club: "TIQ",
    name: "opening",
    date: "11/11/2011",
    photo: "https://www.pexels.com/search/kitten/",
    title: "opening",
    feedback: ["asd", "asd"],
    place: "Hilton Hotel",
    description: "description",
    committee: "Fundraising"
  },
  {
    id: "4",
    club: "MUN",
    name: "conference",
    date: "11/11/2011",
    photo: "https://www.pexels.com/search/kitten/",
    title: "conference",
    feedback: ["dsa", "dsa"],
    place: "Kempinski Hotel",
    description: "description",
    committee: "Security Council"
  }
];
const achievements = [
  { id: "1", photo: "https://www.pexels.com/search/kitten/", text: "Awards" },
  {
    id: "2",
    photo: "https://www.pexels.com/search/kitten/",
    text: "Certification"
  }
];
const committee = [
  {
    name: "Marketing",
    description: "Responsible for Marketing Campaigns",
    page: "www.page.com",
    events: ["recruitment", "opening"],
    team_members: ["Yomna", "Dina"]
  },
  {
    name: "Security Council",
    description: "Simulating UN SC",
    page: "www.page.com",
    events: ["conference", "sessions"],
    team_members: ["Dalia"]
  }
];
const Feedback = [
  { id: "1", viewer_id: "8", text: "cool event", event: "recruitment" },
  { id: "2", viewer_id: "", text: "good food", event: "opening" }
];
const library = [
  {
    academic_paper: "www.twitter.com",
    resolution: "wwww.facebook.com",
    year: "2017"
  },
  {
    academic_paper: "www.youtube.com",
    resolution: "www.otlob.com",
    year: "2018"
  }
];
const message = [
  {
    id: "1",
    sender: "yomna@gmail.com",
    body: "Security Council",
    text: "Hi when does recruitment start",
    replied: "0",
    time: "11/11/2011"
  },
  {
    id: "2",
    sender: "",
    body: "Marketing",
    text: "I love your newest campaign",
    replied: "0",
    time: "12/12/2012"
  }
];
const album = [
  {
    id: "1",
    title: "Session 1",
    description: "Session one photos covered by mdi team",
    photo: "https://www.pexels.com/search/kitten/",
    uploaded_at: "11/11/2011"
  },
  {
    id: "2",
    title: "Conference Day 1",
    description: "Conference day one photos covered by mdi team",
    photo: "https://www.pexels.com/search/kitten/",
    uploaded_at: "12/11/2012"
  }
];
const photo = [
  {
    id: "1",
    album_id: "1",
    link: "https://www.pexels.com/search/kitten/",
    description: "kitten photo 1"
  },
  {
    id: "2",
    album_id: "2",
    link: "https://www.pexels.com/search/kitten/",
    description: "kitten photo 2"
  }
];
// add photo
router.post("/", (req, res) => { 
  const id = req.body.id;
  const albumID = req.body.album_id;
  const photoLink = req.body.link;
  const descrip = req.body.description;
  const ph = {
    id: photo.length + 1,
    album_id: albumID,
    link: photoLink,
    description: descrip
  };
  photo.push(ph);
  res.send(photo);
});

// update photo description
router.put("/:id", (req, res) => {
  const photoID = req.params.id
  const updatedDescription = req.body.description
  const x = photo.find(x => x.id === photoID)
  x.description = updatedDescription
  res.send(x);
});
module.exports=router;