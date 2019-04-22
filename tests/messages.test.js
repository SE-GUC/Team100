const funcs = require("../fn/messagesFn");
const Message = require("../models/Message");

test("get msgs", async done => {
  const msgBefore = await funcs.getAllMessages();

  const msg = {
    sender: "Ahmednjadnkajfnkankajnfkajnjansaaknn",
    committee: "HR",
    text: "Hiiii",
    replied: "false"
  };
  const newM = await funcs.createMessage(msg);
  const MsgID = newM.data.data._id;
  const getM = Message.findOne({ _id: MsgID });
  const msgAfter = await funcs.getAllMessages();
  expect(msgAfter.data.data.length).toEqual(msgBefore.data.data.length + 1);
  expect(getM).toBeDefined();

  // await funcs.deleteCommittees(CommID);

  done();
});

test("create msg", async done => {
  expect.assertions(5);
  const msg = {
    sender: "Ahmedasdjadkjaskdjaskasaaaaaaaaaaaaaaaaaaaaa",
    committee: "HR",
    text: "Hello",
    replied: "false"
  };
  const message = await funcs.createMessage(msg);
  const msgID = message.data.data._id;

  const getM = Message.findOne({ _id: msgID });
  expect(message.data.data.sender).toEqual(msg.sender);
  expect(message.data.data.committee).toEqual(msg.committee);
  expect(message.data.data.text).toEqual(msg.text);
  expect(message.data.data.replied).toEqual(msg.replied);

  expect(getM).toBeDefined();

  await funcs.deleteCertainMessage(msgID);

  done();
});
