const funcs = require("../fn/clubhubFn");
const Club_hub = require("../models/Club_hub");

test("get club hub", async done => {
  const clubBefore = await funcs.getClubHub();

  const newClub = {
    name: "AIESEC",
    brief_description: "Global exchange",
    logo: "AIESEC"
  };
  const newH = await funcs.createClubHub(newClub);
  const clubID = newH.data.Club_hub._id;
  const getH = Club_hub.findOne({ _id: clubID });

  const clubAfter = await funcs.getClubHub();
  //  console.log(commAfter.data.data.length);
  //const specificComm= await funcs.getcommitteesById(CommID);
  // expect(specificComm.data.data.name).toEqual(newC.name);
  // expect(specificComm.data.data.description).toEqual(newC.description);
  // expect(specificComm.data.data.page).toEqual(newC.page);
  // expect(specificComm.data.data.events).toEqual(newC.events);
  // expect(specificComm.data.data.team_members).toEqual(newC.team_members);
  // console.log('working')
  // expect(true).toEqual(true)
  expect(clubAfter.data.data.length).toEqual(clubBefore.data.data.length + 1);
  expect(getH).toBeDefined();

  // await funcs.deleteCommittees(CommID);

  done();
});

test("create club hub", async done => {
  //console.log(login)

  expect.assertions(4);

  const newClub = {
    name: "IHLAM",
    brief_description: "charity",
    logo: "IHLAM"
  };
  const club = await funcs.createClubHub(newClub);
  const clubID = club.data.Club_hub._id;
  const getH = Club_hub.findOne({ _id: clubID });
  expect(club.data.Club_hub.name).toEqual(newClub.name);
  expect(club.data.Club_hub.brief_description).toEqual(
    newClub.brief_description
  );
  expect(club.data.Club_hub.logo).toEqual(newClub.logo);

  expect(getH).toBeDefined();

  done();
});