const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");

dotenv.config({ path: __dirname + "/../.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const messageRoutes = require("./routes/message");
app.use("/api/message", messageRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

// ⭐ Маршрут для кореня
app.get("/", (req, res) => {
  res.send("Backend for LR5 is running 🚀");
});

// AI маршрут
const aiRoutes = require("./routes/ai");
app.use("/api/ai", aiRoutes);

async function startServer() {
  try {
    await mongoose.connect("mongodb+srv://IrynaVy:1111@cluster0.ykogt20.mongodb.net/movie-chatbot?retryWrites=true&w=majority");
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

startServer();
