const funcs = require("../fn/Eventfn");

test("Get comming soon events", async done => {
  expect.assertions(1);
  const response = await funcs.getComingSoonEvent();
  expect(response.data.data.length).toEqual(1);
  done();
});
test("get rate of an event", async done => {
  expect.assertions(1);
  id = "5c95468b9566a387d47f9000";
  const rate = await funcs.getEventRate(id);
  //console.log(achievement.data.Achievement._id);
  expect(rate.data.Rate).toBe(1.3333333333333333);
  done();
});

test("Rate a specific event", async done => {
  expect.assertions(1);
  ratings = await funcs.rateEvent();
  expect(ratings.data.Rate).toBe(
    ratings.data.Rating / ratings.data.Ratingcount
  );
  // expect(ach.data.Achievement.photo).toEqual("sprint33.com")
  done();
});
