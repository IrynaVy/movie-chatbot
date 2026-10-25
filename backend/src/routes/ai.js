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
      "https://api-inference.huggingface.com/models/meta-llama/Meta-Llama-3-8B-Instruct",
      {
        inputs: userMessage
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      response.data?.[0]?.generated_text ||
      "Модель не повернула текст 😕";

    res.json({ reply });

  } catch (err) {
    console.error("HF error:", err.response?.data || err.message);
    res.status(500).json({ error: "HF error", details: err.message });
  }
});

module.exports = router;
