const funcs = require("../fn/messagesFn");

//done
test("get message by committee name", async done => {
  expect.assertions(1);
  committee = "security council";
  const comm = await funcs.getCertainMessage(committee);
  console.log(comm.data.Message.committee);
  expect(comm.data.Message.committee).toEqual(committee);
  done();
});

// done
test("get all messages", async done => {
  expect.assertions(1);
  const response = await funcs.getAllMessages();
  //const resLength= response.data.data.length;
  expect(response.data.data.length).toBe(52);
  done();
});

//done
test("create messages", async done => {
  expect.assertions(4);
  const testMessage = {
    sender: "fhfhfhfhhf@gmail.com",
    text: "lllllllllllll",
    committee: "PR",
    replied: "0",
    time: "2019-02-02T08:11:12.000"
  };
  const message = await funcs.createMessage(testMessage);
  expect(message.data.data.sender).toEqual("fhfhfhfhhf@gmail.com");
  expect(message.data.data.text).toEqual("lllllllllllll");
  expect(message.data.data.committee).toEqual("PR");
  expect(message.data.data.replied).toEqual("0");
  done();
});

//done
test("delete a certain message", async done => {
  id = "5c9de26561e9d2137cac3630";
  const msg = await funcs.deleteCertainMessage(id);
  //console.log(msg.data);
  expect(msg.data.data._id).toEqual(id);
  done();
});

// test (`delete a certain message`, async (done) => {
//   const r1= await funcs.getCertainMessage();
//   const res=r1.data.Message.length-1;
//   const response= await funcs.deleteCertainMessage();
//   const r2= await funcs.getCertainMessage();
//   expect(r2.data.data.length).toEqual(res+1);
//   done();
// })
