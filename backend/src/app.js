const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Тестовий маршрут
app.get('/', (req, res) => {
    res.send('Movie chatbot backend is running!');
});

// Підключення маршруту повідомлень
const messageRoute = require('./routes/message');
app.use('/api/message', messageRoute);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
