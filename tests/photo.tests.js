const funcs = require("./fn/photoFn");

test("createPhoto", async done => {
  expect.assertion(4);
  const Test_photo = {
    album_ID: "5",
    Link: "www.hahah.com",
    Description: "lol"
  };
  const photo = await funcs.createPhoto(Test_photo);
  expect(photo.data.data.album_ID).toEqual("5");
  expect(photo.data.data.Link).toEqual("www.hahah.com");
  expect(photo.data.data.Description).toEqual("lol");
  done();
  expect(photo.data.data.Description).toEqual("lol");
});
test("deletePhoto", async done => {
  expect.assertion(1);
  link = "www.hgurjshg.com";
  const photoo = await funcs.deletePhoto(link);
  expect(photo.data.data.Link).toEqual(link);
  done();
});
test(`getphoto`, async done => {
  const response = await funcs.getphoto();
  expect(response.data.data.album_ID).toEqual("20");
  expect(response.data.data.Description).toEqual("ljsjlkd");
  done();
});
test("UpdatePhoto", async done => {
  expect.assertion(1);
  const response = await funcs.UpdatePhoto;
  expect(photo.data.photo.Description).toEqual("nice");
  done();
});
