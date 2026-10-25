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
      "https://api.openai.com/v1/responses",
      {
        model: "gpt-4o-mini",
        input: userMessage
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.output_text });

  } catch (err) {
    console.error("AI error:", err.response?.data || err.message);
    res.status(500).json({ error: "AI error", details: err.message });
  }
});

module.exports = router;
