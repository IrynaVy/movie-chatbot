const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.text;

    if (!userMessage) {
      return res.status(400).json({ error: "No text provided" });
    }

    const response = await axios.post(
      "https://irynavy-chatbot-static.hf.space/api/predict/",
      { data: [userMessage] }
    );

    const reply =
      response.data?.data?.[0] || "Модель не повернула текст 😕";

    res.json({ reply });
  } catch (err) {
    console.error("Space error:", err.response?.data || err.message);
    res.status(500).json({ error: "Space error", details: err.message });
  }
});

module.exports = router;
