const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/waterfp");
    console.log("💧 MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
};

module.exports = connectDB;
