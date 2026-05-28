require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./config/db");
const userRoutes = require("./routes/Auth");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

connectToDatabase();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});  
