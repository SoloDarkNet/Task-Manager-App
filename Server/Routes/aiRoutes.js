const express = require("express");
const Router = express.Router();
const { getAISuggestions } = require("../Controller/aiController");

Router.post("/suggestions", getAISuggestions);
Router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "AI Route Working",
  });
});

module.exports = Router;
