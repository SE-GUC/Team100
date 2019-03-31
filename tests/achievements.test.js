const funcs = require("../fn/achievementsFn")

test("create achievements", async done => {
  expect.assertions(3)
  const achievement = {
    description: "sprint 3",
    photo: "sprint.com",
    tag: "#sprint"
  }
  const a = await funcs.createAchievements(achievement)
  expect(a.data.Achievement.description).toEqual("sprint 3")
  expect(a.data.Achievement.photo).toEqual("sprint.com")
  expect(a.data.Achievement.tag).toEqual("#sprint")
  done()
})

test("Delete an achievement", async done => {
  expect.assertions(1)
  id = "5ca0ad2a44899c44b4107afe"
  const ach = await funcs.deleteAchievement(id)
  expect(ach.data.Achievement._id).toEqual(id)
  done()
})

test("Update an achievement", async done => {
  expect.assertions(2)
  ach = await funcs.updateAchievement()
  expect(ach.data.Achievement.description).toEqual("update description")
  expect(ach.data.Achievement.photo).toEqual("sprint33.com")
  done()
})
