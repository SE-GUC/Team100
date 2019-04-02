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
test("update User", async (done) => {
    id = "5c94fbb3d50a3626620b38c9";
    const u = {
        name: "Mohamed"
    };
    const k = await funcs.updateUser(u);
    const user = await funcs.getaUser(id)
    expect(user.data.name).toEqual("Mohamed");
    done();
})

test('add a new user', async (done) => {
    expect.assertions(11)
    const user = {
        name: "Ahmed",
        email: "ahm@gmail.com",
        birth_date: " ",
        password: "Ah12345",
        major: "BI",
        telephone: 243671351,
        photo: "Photo1",
        gucian: true,
        club: " ",
        committee_type: " ",
        user_type: "user"
    }
    const u = await funcs.registeraUser(user);


    expect(u.data.data.name).toEqual("Ahmed");
    expect(u.data.User.email).toEqual("ahm@gmail.com");
    expect(u.data.User.birth_date).toEqual(" ");
    expect(u.data.User.password).toEqual("Ah12345");
    expect(u.data.User.major).toEqual("BI");
    expect(u.data.User.telephone).toEqual(243671351);
    expect(u.data.User.photo).toEqual("Photo1");
    expect(u.data.User.gucian).toEqual(true);
    expect(u.data.User.club).toEqual(" ");
    expect(u.data.User.committee_type).toEqual(" ");
    expect(u.data.User.user_type).toEqual("user");

    done();
}, 100000);