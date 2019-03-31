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
