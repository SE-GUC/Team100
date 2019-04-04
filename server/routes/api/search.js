const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Club_hub = require("../../models/Club_hub")
const Achievement = require("../../models/Achievement")
const Announcement = require("../../models/Announcement")
const Album = require("../../models/Album")
const Event = require("../../models/Event")
const Faq = require("../../models/Faq")

router.get("/", async (req, res) => {
  try {
    const AchievementSearch = await Achievement.find(
      { $text: { $search: req.body.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const AlbumSearch = await Album.find(
      { $text: { $search: req.body.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const AnnouncementSearch = await Announcement.find(
      { $text: { $search: req.body.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const ClubhubSearch = await Club_hub.find(
      { $text: { $search: req.body.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const FaqSearch = await Faq.find(
      { $text: { $search: req.body.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const eventSearch = await Event.find(
      { $text: { $search: req.body.search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    if (
      AchievementSearch.length === 0 &&
      AlbumSearch.length === 0 &&
      AnnouncementSearch.length === 0 &&
      ClubhubSearch.length === 0 &&
      FaqSearch.length === 0 &&
      eventSearch.length === 0
    ) {
      return res.send("Sorry we can not find what you are looking for.")
    } else
      res.json({
        Achievements: AchievementSearch,
        Albums: AlbumSearch,
        Announcements: AnnouncementSearch,
        Clubs: ClubhubSearch,
        FAQs: FaqSearch,
        Events: eventSearch
      })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
