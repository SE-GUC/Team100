const funcs = require("../fn/clubhubFn");
test("get brief description of club ", async done => {
  expect.assertions(1);
  id = "5c9516bd00bed630647f8bfa";
  const description = await funcs.getBriefDescription(id);
  //console.log(achievement.data.Achievement._id);
  expect(description.data.Description).toEqual("updated description 2");
  done();
});

test("Update brief description of a club", async done => {
  expect.assertions(1);
  descr = await funcs.updateBriefDescription();
  expect(descr.data.Description.brief_description).toEqual(
    "updated description 2"
  );
  done();
});
