"use strict";

require("dotenv").config();

import streamEvent from "./sockets/handler";
import express from "express";

const index = require("./routes/index");

const cors = require("cors");

// CORS Options for the communication between front and back
let corsOptions = {
  origin: [process.env.FRONT_LINK],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

require("./database/connection");

const app = express();

app.use(express.static("public"));
app.use(cors(corsOptions));

app.use("/", index);
app.use(function(req, res) {
  res.status(404).send("Sorry cant find that!");
});

const listenedApp = app.listen(process.env.BACK_PORT, () =>
  console.log(`Server is now listening on port ${process.env.BACK_PORT}!`)
);

const io = require("socket.io")(listenedApp);

io.on("connection", (socket: any) => {
  console.log("A user just started a connection !");

  streamEvent(socket);
});

module.exports = app;
