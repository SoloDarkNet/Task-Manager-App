const express = require("express");
const cors = require("cors");
const dns = require("dns");
const ConnectDB = require("./config/configure");
const authRoutes = require("./Routes/authRoutes");
const taskRoutes = require("./Routes/taskRoutes");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("Solomon Server Start Ayrichu!!!");
});

app.listen(5000, () => {
  console.log("Solomon Server Start Ayrichu !!!");
});
