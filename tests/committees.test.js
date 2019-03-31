const funcs = require("../fn/committeesFn");

test("Number of committees should be 4", async done => {
  expect.assertions(1);
  const response = await funcs.getcommittees();
  expect(response.data.data.length).toBe(24);
  done();
});

test("create committees", async done => {
  expect.assertions(5);
  const comm = {
    name: "NEWHR",
    description: "ndnlan",
    page: "adjklans",
    events: ["openning"],
    team_members: ["AYA"]
  };
  const committee = await funcs.createCommmittee(comm);
  console.log(committee.data.data.name);
  expect(committee.data.data.name).toEqual("NEWHR");
  expect(committee.data.data.description).toEqual("ndnlan");
  expect(committee.data.data.page).toEqual("adjklans");
  expect(committee.data.data.events).toEqual(["openning"]);
  expect(committee.data.data.team_members).toEqual(["AYA"]);
  done();
});

test("delete committee", async done => {
  expect.assertions(1);
  const c = {
    name: "commTest"
  };
  const com = await funcs.deleteCommittees(c);
  expect(com.data.data.name).toEqual("commTest");
  done();
});

test("update committee", async done => {
  expect.assertions(1);
  const t = {
    name: "updateee"
  };
  const up = await funcs.updateCommittee(t);
  //console.log(up.data.Committee.name)
  expect(up.data.Committee.name).toEqual("updateee");
  done();
});
