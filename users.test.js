const funcs = require("../fn/userFn");
beforeAll(done => {
    done();
})

test("get all users", async (done) => {
    const res = await funcs.getUsers();
    const resLength = res.data.data.length;
    expect(res.data.data.length).toBe(6);
    done();
})

test("get a user", async (done) => {
    id = "5c94fbb3d50a3626620b38c9";
    const user = await funcs.getaUser(id)
    expect(user.data.User._id).toEqual(id);
    done();
})

test("delete a user", async (done) => {
    id = "5c962d746b1acd28dc3b4330";
    const user = await funcs.deleteUser(id);
    expect(user.data.data._id).toEqual(id);
    done();
})