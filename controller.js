const express = require("express")
const Tracks = require("./controller")

const getAllTracks = (req, res, next) => {
    Tracks.getTracks("/tracks", (req, res) => {
        db.query("SELECT * FROM tracks", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      });
}
