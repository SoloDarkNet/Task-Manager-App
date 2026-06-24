const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const ConnectDB = async () => {
  const mongoDbUrl = process.env.MONGODB_URL;

  if (!mongoDbUrl) {
    throw new Error(
      "Missing MongoDB connection string. Add MONGO_URI=... to Server/.env",
    );
  }

  try {
    await mongoose.connect(mongoDbUrl);
    console.log("Solomon MongoDb Ithuvum Connect Ayrichu !!!");
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = ConnectDB;
