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

test("Update an event", async (done) => {
  expect.assertions(1)
  ev = await funcs.updateEvents()
  console.log(ev.data.Event)
  expect(ev.data.Event.description).toEqual("update description")
 
  done()
});

test('getting certain event', async(done) => {
    expect.assertions(2)
    id = "5c95382be4793067bcc3f232"
    const r = await funcs.getCertainEvent(id);
     console.log(r.data.data)
    expect(response.data.data.name_event).toEqual("10th anniversary");
    expect(response.data.data.description).toEqual("mun");
    done();
});

test('Delete an event', async(done) => {
    id = "5c9526e90e68c6675c06d3c6"
    const e = await funcs.deleteEvents(id);
    expect(e.data.data._id).toEqual(id);
    done();
});

  test ("create events",async (done)=>{
    expect.assertions(13);
    const event ={
        name_event: "concert",
        club: "MUN",
        year: 2019,
        month: 5,
        day: 5,
        photo: "photoooTesting",
      location: "locationTesting",
      description: "Trial",
      rating: 5,
      committee: "HR",
      rating: 5,
      ratingcount: 10,
      rate: 10
    };
    const a =await funcs.createEvents(event);
   // console.log(a.data);
    expect(a.data.data.name_event).toEqual("concert");
    expect(a.data.data.club).toEqual("MUN");
    expect(a.data.data.year).toEqual(2019);
    expect(a.data.data.month).toEqual(5);
    expect(a.data.data.day).toEqual(5);
    expect(a.data.data.photo).toEqual("photoooTesting");
    expect(a.data.data.location).toEqual("locationTesting");
    expect(a.data.data.description).toEqual("Trial");
    expect(a.data.data.rating).toEqual(5);
    expect(a.data.data.committee).toEqual("HR");
    expect(a.data.data.rating).toEqual(5);
    expect(a.data.data.ratingcount).toEqual(10);
    expect(a.data.data.rate).toEqual(10);
    done();
});
