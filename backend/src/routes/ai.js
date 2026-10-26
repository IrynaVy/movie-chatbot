const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const userMessage = req.body.text;

  const reply = `AI-відповідь: "${userMessage}". 
  Я проаналізував ваше повідомлення і сформував відповідь.`;

  res.json({ reply });
});

module.exports = router;
