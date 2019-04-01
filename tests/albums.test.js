const funcs = require("../fn/Albumfn");

beforeAll(done => {
  done();
});

//albums
test("Get all albums", async done => {
  expect.assertions(1);
  const result = await funcs.getAllAlbums();
  expect(result.data.data.length).toBe(13);
  done();
});

test("Get certain album", async done => {
  expect.assertions(1);
  const id = "5ca122ecff71cc43f65e4702";
  const result = await funcs.getCertainAlbum(id);
  expect(result.data.data._id).toEqual(id);
  done();
});

test("Delete album", async done => {
  expect.assertions(1);
  const id = "5ca28ef995eca41c48b446d3";
  const result = await funcs.deleteCertainAlbum(id);
  expect(result.data.data._id).toEqual(id);
  done();
});

test("Create album", async done => {
  expect.assertions(3);
  const result = await funcs.postAlbum();
  console.log(result.data.data._id);
  expect(result.data.data.title).toEqual("Event 12");
  expect(result.data.data.description).toEqual("fcghbj");
  expect(result.data.data.photo).toEqual(["5c96009d01119d16989aebfc"]);
  done();
});

test("Update album", async done => {
  expect.assertions(3);
  const id = "5ca122ecff71cc43f65e4702";
  await funcs.updateCertainAlbum(id);
  const result = await funcs.getCertainAlbum(id);
  expect(result.data.data.title).toEqual("Session 12");
  expect(result.data.data.description).toEqual("abcde");
  expect(result.data.data.photo).toEqual(["5c96009d01119d16989aebfd"]);
  done();
});
