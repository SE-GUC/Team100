const funcs = require("./fn/libraryFn");

test("createAP", async done => {
  expect.assertion(2);
  const Test_AP = {
    Academic_paper: "www.lol.com",
    Resolution: "www.hahaha.com",
    Year: "2017"
  };
  const AP = await funcs.createAP(Test_AP);
  expect(photo.data.data.Academic_paper).toEqual("www.lol.com");
  expect(photo.data.data.Resolution).toEqual("www.hahaha.com");
  expect(photo.data.data.Year).toEqual("2017");
  done();
  expect(libraries.data.data.Year).toEqual("2017");
});
test("delete AP", async done => {
  expect.assertion(1);
  Year = "2016";
  const APP = await funcs.deleteAP(link);
  expect(libraries.data.data.Year).toEqual(Year);
  done();
});
test(`getAP`, async done => {
  const response = await funcs.getAP();
  expect(response.data.data.Academic_paper).toEqual("www.hkjgkn.com");
  expect(response.data.data.Resolution).toEqual("www.hjnm.com");
  expect(response.data.data.Year).toEqual("2016");
  done();
});
