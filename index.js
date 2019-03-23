const express = require("express");
const mongoose = require("mongoose");

// Require Router Handlers
const achievements = require("./routes/api/achievements");
const clubmuns = require("./routes/api/clubmuns");
const announcements = require("./routes/api/announcements");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Direct to Route Handlers
app.use("/api/achievements", achievements);
app.use("/api/clubmuns", clubmuns);
app.use("/api/announcements", announcements);

app.use((req, res) =>
  res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server on ${port}`));
