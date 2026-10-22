const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET
router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// POST
router.post("/", async (req, res) => {
  const { sender, text } = req.body;

  const msg = new Message({ sender, text });
  await msg.save();

  res.json({ status: "saved", message: msg });
});

module.exports = router;
