const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);

// run server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
