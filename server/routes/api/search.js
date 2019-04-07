const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Club_hub = require("../../models/Club_hub")
const Achievement = require("../../models/Achievement")
const Announcement = require("../../models/Announcement")
const Event = require("../../models/Event")
const Faq = require("../../models/Faq")

router.get("/:keyword", async (req, res) => {
  try {
    const AchievementSearch = await Achievement.find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const AnnouncementSearch = await Announcement.find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const ClubhubSearch = await Club_hub.find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const FaqSearch = await Faq.find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    const eventSearch = await Event.find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } })

    if (
      AchievementSearch.length === 0 &&
      AnnouncementSearch.length === 0 &&
      ClubhubSearch.length === 0 &&
      FaqSearch.length === 0 &&
      eventSearch.length === 0
    ) {
      // reutn res.send()
    } else
      res.json({
        Achievements: AchievementSearch,
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
