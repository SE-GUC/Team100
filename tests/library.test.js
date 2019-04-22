const funcs = require("../fn/libraryFn");
const Library = require("../models/Library");

test("get libraries", async done => {
  const libBefore = await funcs.getallAp();

  const l = {
    Academic_paper: "lastTestingggggggggggggggggggggggggggggggg",
    Resolution: "ndnlanajdjaahajdhjdhjhdjadhkdahdkjdkjbadkjbdkjdabkdbakadb",
    Year: 2018
  };
  const newL = await funcs.createAP(l);
  const libraryID = newL.data.Library._id;
  const getL = Library.findOne({ _id: libraryID });
  const libAfter = await funcs.getallAp();

  expect(libAfter.data.data.length).toEqual(libBefore.data.data.length + 1);
  expect(getL).toBeDefined();

  // await funcs.deleteCommittees(CommID);

  done();
});

test("create Libraries", async done => {
  expect.assertions(4);
  const l = {
    Academic_paper: "lastTestingggggggggggggggggggggggggggggggg",
    Resolution: "ndnlanajdjaahajdhjdhjhdjadhkdahdkjdkjbadkjbdkjdabkdbakadb",
    Year: 2018
  };
  const library = await funcs.createAP(l);
  console.log(library.data.Library.Resolution);
  const libraryID = library.data.Library._id;

  const getL = Library.findOne({ _id: libraryID });
  expect(library.data.Library.Academic_paper).toEqual(l.Academic_paper);
  expect(library.data.Library.Resolution).toEqual(l.Resolution);
  expect(library.data.Library.Year).toEqual(l.Year);

  expect(getL).toBeDefined();

  await funcs.deleteAP(libraryID);

  done();
});
