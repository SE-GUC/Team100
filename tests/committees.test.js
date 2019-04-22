const funcs = require("../fn/committeesFn");
const Committee = require("../models/Committee");

test("Number of committees should be 4", async done => {
  const commBefore = await funcs.getcommittees();

  const newComm = {
    name: "PR",
    description: "ndnlan",
    page: "adjklans",
    events: ["openning"],
    team_members: ["AYA"]
  };
  const newC = await funcs.createCommmittee(newComm);
  const CommID = newC.data.data._id;
  const getC = Committee.findOne({ _id: CommID });

  const commAfter = await funcs.getcommittees();

  expect(commAfter.data.data.length).toEqual(commBefore.data.data.length + 1);
  expect(getC).toBeDefined();

  done();
});

test("create committees", async done => {
  expect.assertions(6);
  const comm = {
    name: "newcommittee ",
    description: "ndnlan",
    page: "adjklans",
    events: ["openning"],
    team_members: ["AYA"]
  };
  const committee = await funcs.createCommmittee(comm);
  const committeeID = committee.data.data._id;

  const getC = Committee.findOne({ _id: committeeID });
  expect(committee.data.data.name).toEqual(comm.name);
  expect(committee.data.data.description).toEqual(comm.description);
  expect(committee.data.data.page).toEqual(comm.page);
  expect(committee.data.data.events).toEqual(comm.events);
  expect(committee.data.data.team_members).toEqual(comm.team_members);
  expect(getC).toBeDefined();

  await funcs.deleteCommittees(committeeID);

  done();
});
