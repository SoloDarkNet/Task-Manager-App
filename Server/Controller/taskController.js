const Task = require("../Models/Task");

const CreateTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      user: req.user.id,
    });
    res.status(201).json({ task });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const GetAllTask = async (req, res) => {
  try {
    const tasks = (await Task.find({ user: req.user.id })).sort({
      createdAt: -1,
    });
    console.log(tasks);
    res.status(200).json({ tasks });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//Update Task

const UpdatedTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    //check Task owner Exist
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const updatedData = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const DeletedTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    //Security Check
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Task Deleted Successfully",
      deletedTask,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

const GetTask = async (req, res) => {
  try {
    const getTask = await Task.find({ user: req.user.id });
    if (!getTask) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    res.status(200).json({
      message: "Get Task Successfully",
      getTask,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = { CreateTask, GetAllTask, UpdatedTask, DeletedTask, GetTask };
