const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const dns = require("dns");
const cron = require("node-cron");
const ConnectDB = require("./config/configure");
const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const notificationRoutes = require("./Routes/notificationRoutes");
const { sendPendingReminder } = require("./Controller/notificationController");
const aiSuggestionRoutes = require("./Routes/aiRoutes");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/ai", aiSuggestionRoutes);

// Every 5 minutes all day (India time)
cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Running One hour reminder...", new Date().toISOString());
    await sendPendingReminder();
  },
  {
    timezone: "Asia/Kolkata",
  },
);

app.get("/", (req, res) => {
  res.send("Solomon Server Start Ayrichu!!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Solomon Server Start Ayrichu !!!");
  console.log("Reminder scheduler active: every Hour (Asia/Kolkata)");
});
