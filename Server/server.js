const express = require("express");
const cors = require("cors");
const dns = require("dns");
const cron = require("node-cron");
const ConnectDB = require("./config/configure");
const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const notificationRoutes = require("./Routes/notificationRoutes");
const { sendPendingReminder } = require("./Controller/notificationController");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/notification", notificationRoutes);

// Every hour 6AM to 9PM reminder
cron.schedule("0 6-21 * * *", () => {
  console.log("Running hourly reminder...");
  sendPendingReminder();
});

app.get("/", (req, res) => {
  res.send("Solomon Server Start Ayrichu!!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Solomon Server Start Ayrichu !!!");
});
