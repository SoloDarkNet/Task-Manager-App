const mongoose = require("mongoose");
const MogoDB_URL =
  "mongodb+srv://solomon-55:solomon12345@cluster0.j4shurd.mongodb.net/?appName=Cluster0";

const ConnectDB = async () => {
  try {
    await mongoose.connect(MogoDB_URL);
    console.log("Solomon MongoDb Ithuvum Connect Ayrichu !!!");
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = ConnectDB;
