const express = require("express");
const router = express.Router();

import { pipeline } from "@xenova/transformers";

let chatModel;
(async () => {
  chatModel = await pipeline("text-generation", "Xenova/gpt2");
})();

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.text;

    const response = await chatModel(userMessage, {
      max_length: 100
    });

    const reply = response[0].generated_text;
    res.json({ reply });

  } catch (err) {
    console.error("Local AI error:", err);
    res.status(500).json({ error: "Local AI error", details: err.message });
  }
});

module.exports = router;
