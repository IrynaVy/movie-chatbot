const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.text;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              { text: userMessage }
            ]
          }
        ]
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini error", details: err.message });
  }
});

module.exports = router;
