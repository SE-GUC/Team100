
const funcs = require("../fn/usersfn");

test("get all users", async (done) => {
    const res = await funcs.getUsers();
    const resLength = res.data.data.length;
    expect(res.data.data.length).toBe(7);
    done();
})

test("update User", async (done) => {
    id = "5c94fbb3d50a3626620b38c9";
    const u = {
        name: "Mohamed"
    };
    const k = await funcs.updateUser(u);
    expect(k.data.User.name).toEqual("Mohamed");
    done();
})

test("delete a user", async (done) => {
    id = "5c962d746b1acd28dc3b4330";
    const user = await funcs.deleteUser(id);
    expect(user.data.data._id).toEqual(id);
    done();
})


test("get a user", async (done) => {
    id = "5c94fbb3d50a3626620b38c9";
    const user = await funcs.getaUser(id);
    expect(user.u.id).toEqual(id);
    done();
})

test('add a new user', async (done) => {
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
    expect(u.data.data.email).toEqual("ahm@gmail.com");
    expect(u.data.data.birth_date).toEqual(" ");
    expect(u.data.data.password).toEqual("Ah12345");
    expect(u.data.data.major).toEqual("BI");
    expect(u.data.data.telephone).toEqual(243671351);
    expect(u.data.data.photo).toEqual("Photo1");
    expect(u.data.data.gucian).toEqual(true);
    expect(u.data.data.club).toEqual(" ");
    expect(u.data.data.committee_type).toEqual(" ");
    expect(u.data.data.user_type).toEqual("user");

    done();
});
