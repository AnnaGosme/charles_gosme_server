const express = require("express");
const pool = require("./config");

const Tracks = {};

Tracks.getAllTracks = (req, res) =>
  pool.getConnection((err, connection) => {
    if (err) throw err;
    db.query("SELECT * FROM tracks", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
