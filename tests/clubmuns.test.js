const funcs = require("../fn/clubmunFn");

test(`get a certain clubmun mission `, async done => {
  const response = await funcs.getMission();
  expect(response.data.x).toEqual("Change the world");
  done();
}),
  test(`get a certain clubmun vision `, async done => {
    const response = await funcs.getVision();
    expect(response.data.x).toEqual("Change the world");
    done();
  }),
  test("get certain clubmun description", async done => {
    const response = await funcs.getDescription();
    expect(response.data.x).toEqual("Make the world a better place");
    done();
  });
test("Update mission", async (done) => {
  // expect.assertions(1)
  id = "5c95192b2e07ab319cf2a77b"
  update = await funcs.updatemission(id);
  console.log(update.data.mission)
  expect(update.data.mission).toEqual("new mission")
  done()
});
test("Update mun's description", async done => {
  //expect.assertions(1)
  d = await funcs.updatedescription()
  expect(d.data.Clubmun.description).toEqual("updated description")
  done()
})
