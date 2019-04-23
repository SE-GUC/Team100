const funcs = require("../fn/Albumfn");
const Album = require("../models/Album");

test("get albums", async done => {
  const albumBefore = await funcs.getAllAlbums();

  const A = {
    title: "photoshootTesting",
    description: "ndnlan"
  };
  const newA = await funcs.createAlbum(A);
  const AID = newA.data.data._id;
  const getA = Album.findOne({ _id: AID });
  const albumAfter = await funcs.getAllAlbums();
  //  console.log(commAfter.data.data.length);
  //const specificComm= await funcs.getcommitteesById(CommID);
  // expect(specificComm.data.data.name).toEqual(newC.name);
  // expect(specificComm.data.data.description).toEqual(newC.description);
  // expect(specificComm.data.data.page).toEqual(newC.page);
  // expect(specificComm.data.data.events).toEqual(newC.events);
  // expect(specificComm.data.data.team_members).toEqual(newC.team_members);
  expect(albumAfter.data.data.length).toEqual(albumBefore.data.data.length + 1);
  expect(getA).toBeDefined();
  // await funcs.deleteCommittees(CommID);

  done();
});

test("create albums", async done => {
  expect.assertions(3);
  const comm = {
    title: "photoshootTesting",
    description: "ndnlan"
  };
  const album = await funcs.createAlbum(comm);
  const albumID = album.data.data._id;

  const getA = Album.findOne({ _id: albumID });
  expect(album.data.data.title).toEqual(comm.title);
  expect(album.data.data.description).toEqual(comm.description);

  expect(getA).toBeDefined();

  await funcs.deleteCertainAlbum(albumID);

  done();
});