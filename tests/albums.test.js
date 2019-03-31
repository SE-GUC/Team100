const funcs = require("../fn/Albumfn");

//albums
test("Get all albums", async done => {
  expect.assertions(1);
  const result = await funcs.getAllAlbums();
  expect(result.data.data.length).toBe(10);
});

test("Get certain album", async done => {
  expect.assertions(1);
  const id = "5ca122ecff71cc43f65e4702";
  const result = await funcs.getCertainAlbum(id);
  console.log(result.data.data._id);
  expect(result.data.data._id).toEqual(id);
});

test("Delete album", async done => {
  expect.assertions(1);
  const id = "5ca1233eff71cc43f65e4703";
  const result = await funcs.deleteCertainAlbum(id);
  expect(result.data.data._id).toEqual(id);
});

test("Create album", async done => {
  expect.assertions(3);
  const result = await funcs.postAlbum();
  expect(result.data.Album.title).toEqual("event 12");
  expect(result.data.Album.description).toEqual("fcghbj");
  expect(result.data.Album.photo).toEqual(["5c96009d01119d16989aebfc"]);
  done();
  expect(result.data.Album.uploaded_at).toEqual(Date.now);
});

test("Update album", async done => {
  expect.assertions(3);
  const id = "5c95fed79c054043a42c9397";
  const result = await funcs.updateCertainAlbum(id);
  expect(result.data.data.title).toEqual("session 12");
  expect(result.data.data.description).toEqual("abcde");
  expect(result.data.data.photo).toEqual(["5c96009d01119d16989aebfd"]);
  done();
});
