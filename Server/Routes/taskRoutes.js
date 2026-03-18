const express = require("express");
const Router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  CreateTask,
  GetAllTask,
  UpdatedTask,
  DeletedTask,
  GetTask,
} = require("../Controller/taskController");

Router.post("/createTask", authMiddleware, CreateTask);
Router.get("/getTask", authMiddleware, GetAllTask);
Router.put("/updateTask/:id", authMiddleware, UpdatedTask);
Router.delete("/deletedTask/:id", authMiddleware, DeletedTask);
Router.get("/allTask", authMiddleware, GetTask);

module.exports = Router;
