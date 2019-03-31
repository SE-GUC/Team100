const funcs = require("../fn/Announcementfn");

test("Get all announcements", async done => {
  expect.assertions(1);
  const response = await funcs.getAnnouncements();
  expect(response.data.data.length).toEqual(19);
  done();
});
test("Get an announcement", async done => {
  expect.assertions(1);
  id = "5c950b25d6d3eb29fe027502";
  const announcement = await funcs.getAnAnnouncement(id);
  expect(announcement.data.Announcement._id).toEqual(id);
  done();
});
test("create an announcement", async done => {
  expect.assertions(6);
  const testAnnouncement = {
    description: "hi",
    date: "2019-02-28T22:00:00.000Z",
    tag: "hi",
    created_by: "hi",
    videos: "hi",
    photos: "hi"
  };
  const ann = await funcs.createAnnouncement(testAnnouncement);
  expect(ann.data.data.description).toEqual("hi");
  expect(ann.data.data.date).toEqual("2019-02-28T22:00:00.000Z");
  expect(ann.data.data.tag).toEqual("hi");
  expect(ann.data.data.created_by).toEqual("hi");
  expect(ann.data.data.videos).toEqual("hi");
  expect(ann.data.data.photos).toEqual("hi");
  done();
});
test("Delete an announcement", async done => {
  expect.assertions(1);
  id = "5ca0d56a51f9e3247dd9f525";
  const announcement = await funcs.deleteAnnouncement(id);
  expect(announcement.data.data._id).toEqual(id);
  done();
});
test("Update an announcement", async done => {
  expect.assertions(6);
  const testAnnouncement = {
    description: "yo #fun",
    date: "2019-02-28T22:00:00.000Z",
    tag: "lay",
    created_by: "LOLy",
    videos: "NOy",
    photos: "BYEy"
  };
  const response = await funcs.updateAnnouncement(testAnnouncement);
  expect(response.data.Announcement.description).toEqual("yo #fun");
  expect(response.data.Announcement.date).toEqual("2019-02-28T22:00:00.000Z");
  expect(response.data.Announcement.tag).toEqual("lay");
  expect(response.data.Announcement.created_by).toEqual("LOLy");
  expect(response.data.Announcement.videos).toEqual("NOy");
  expect(response.data.Announcement.photos).toEqual("BYEy");
  done();
});
