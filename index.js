const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "charles_gosme_music",
});

app.post("/tracks", (req, res) => {
  const title = req.body.title;
  const duration = req.body.duration;
  const year = req.body.year;
  const original = req.body.original;
  const artist = req.body.artist;
  const album = req.body.album;
  const url = req.body.url;
  const order = req.body.order;

  db.query(
    "INSERT INTO tracks (track_title, track_duration, track_release_year, original_track, original_artist, track_album, track_youtube_url, track_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [title, duration, year, original, artist, album, url, order],
    (err, result) => {
      if (err) {
        res.status(500).send(`Error adding track: ${err}`);
      } else {
        res.status(201).send("Track successfully added");
      }
    }
  );
});

app.get("/tracks", (req, res) => {
  db.query("SELECT * FROM tracks", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/tracks/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  db.query(
    "UPDATE tracks SET track_title = ? WHERE track_id = ?",
    [title, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/tracks/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM tracks WHERE track_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
