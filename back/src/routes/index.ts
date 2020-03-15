import express from "express";

const router = express.Router();

import { getAllMessages, deleteAllMessages } from "../database/functions";

/* GET home page. */
router.get("/", (req, res) => {
  res.send("The back is working !");
  var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`Someone loaded that page : ${ip}`);
});

router.get("/api/getAllMessages", async (req, res) => {
  res.send(await getAllMessages());
});
router.get("/api/deleteAllMessages", async (req, res) => {
  deleteAllMessages();
  res.redirect("/api/getAllMessages");
});

module.exports = router;
