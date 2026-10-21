const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Movie chatbot backend is running!');
});

const messageRoute = require('./routes/message');
app.use('/api/message', messageRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const Message = mongoose.model("Message", {
  sender: String,
  text: String,
  timestamp: Date
});

await Message.create({
  sender: "user",
  text: req.body.text,
  timestamp: new Date()
});

await Message.create({
  sender: "bot",
  text: reply,
  timestamp: new Date()
});
