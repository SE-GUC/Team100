const funcs = require("../fn/Announcementfn");
const Announcement = require("../models/Announcement");
let announcementID = null;

test("get announcements", async done => {
  const annBefore = await funcs.getAnnouncements();
  const s = {
    description: "aglaain",
    date: "2019-02-28T22:00:00.000Z",
    created_by: "new",
    videos: "hi",
    photos: "hi",
    tag: "#hi"
  };

  const newA = await funcs.createAnnouncement(s);
  const annId = newA.data.data._id;
  announcementID = Announcement.findOne({ _id: annId });
  const annAfter = await funcs.getAnnouncements();
  expect(annAfter.data.data.length).toEqual(annBefore.data.data.length + 1);
  expect(announcementID).toBeDefined();
  //funcs.deleteAnnouncement(announcementID);

  done();
});

test("create announcement", async done => {
  expect.assertions(7);
  const s = {
    description: "hi",
    date: "2019-02-28T22:00:00.000Z",
    created_by: "hi",
    videos: "hi",
    photos: "hi",
    tag: "#hi"
  };
  const ann = await funcs.createAnnouncement(s);
  const annID = ann.data.data._id;
  console.log(ann.data.data);
  const getA = Announcement.findOne({ _id: annID });
  expect(ann.data.data.description).toEqual(s.description);
  expect(ann.data.data.date).toEqual(s.date);
  expect(ann.data.data.created_by).toEqual(s.created_by);
  expect(ann.data.data.videos).toEqual(s.videos);
  expect(ann.data.data.photos).toEqual(s.photos);
  expect(ann.data.data.tag).toEqual(s.tag);

  expect(getA).toBeDefined();

  done();
});
