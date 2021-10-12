#!/usr/bin/env node

const express = require("express");
const Datastore = require("nedb");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log("I got a request!");

  const data = request.body;
  database.insert(data);
  response.json(data);
});

app.listen(4000, () => console.log("listening at 4000"));
