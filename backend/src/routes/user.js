const express = require("express");
const router = express.Router();
const sanitize = require("sanitize-html");

router.post("/", (req, res) => {
  let { name, email, message } = req.body;

  // Санітизація
  name = sanitize(name);
  email = sanitize(email);
  message = sanitize(message);

  // Валідація
  if (!name || !email || !message) {
    return res.status(400).json({ status: "error", message: "Усі поля обов'язкові" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ status: "error", message: "Некоректний email" });
  }

  console.log("Отримано дані користувача:", { name, email, message });

  res.json({ status: "success", message: "Дані отримано" });
});

module.exports = router;
