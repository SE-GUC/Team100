const funcs = require("../fn/clubmunFn");


test("Update mun's description", async done => {
    //expect.assertions(1)
    d = await funcs.updatedescription()
    expect(d.data.Clubmun.description).toEqual("updated description")
    done()
})

test("Update mission", async (done) => {
    // expect.assertions(1)
    update = await funcs.updatemission();
    console.log(update.data.info.mission)
    expect(update.data.info.mission).toEqual("new mission")
    done()
});

test("Update vision", async (done) => {
    // expect.assertions(1)
    update = await funcs.updatevision();
    console.log(update.data.info.vision)
    expect(update.data.info.vision).toEqual("new vision")
    done()
});