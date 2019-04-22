const funcs = require("../fn/achievementsFn");
const Achievement = require("../models/Achievement");

test("get achievements", async done => {
  const achBefore = await funcs.getAllAchievements();

  const newAch = {
    description: "testing",
    photo: "testing"
  };
  const newA = await funcs.createAchievements(newAch);
  const achID = newA.data.Achievement._id;
  const getA = Achievement.findOne({ _id: achID });

  const achAfter = await funcs.getAllAchievements();

  expect(achAfter.data.data.length).toEqual(achBefore.data.data.length + 1);
  expect(getA).toBeDefined();


  done();
});

test("create achievements", async done => {
  expect.assertions(3);
  const comm = {
    description: "tesing",
    photo: "testing"
  };
  const a = await funcs.createAchievements(comm);
  //console.log(a);
  const achievementID = a.data._id;

  const getA = Achievement.findOne({ _id: achievementID });
  expect(a.data.Achievement.description).toEqual(comm.description);
  expect(a.data.Achievement.photo).toEqual(comm.photo);
  expect(getA).toBeDefined();

  await funcs.deleteAchievement(achievementID);

  done();
});