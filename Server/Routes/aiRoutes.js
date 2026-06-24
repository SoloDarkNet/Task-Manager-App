const express = require("express");
const Router = express.Router();
const { getAISuggestions } = require("../Controller/aiController");

Router.post("/suggestions", getAISuggestions);

module.exports = Router;
