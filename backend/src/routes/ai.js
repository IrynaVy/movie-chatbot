const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.text;

    const response = await axios.post(
      "https://api-inference.huggingface.com/models/google/flan-t5-base",
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data[0].generated_text;
    res.json({ reply });

  } catch (err) {
    console.error("HF error:", err.response?.data || err.message);
    res.status(500).json({ error: "HF error", details: err.message });
  }
});

module.exports = router;
