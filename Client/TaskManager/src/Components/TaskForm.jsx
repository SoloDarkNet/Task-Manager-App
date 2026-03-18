import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/app";
import "../App.css";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      priority,
      status,
    };

    try {
      const res = await api.post("/task/createTask", newTask);

      console.log(res);

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setStatus("Pending");

      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card p-4 shadow mb-4 d-flex justify-content-center align-items-center formContainer">
      <h4 className="text-center mb-3">Add Task</h4>

      <form onSubmit={handleSubmit} className="form-container">
        {/* Title */}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description */}

        <textarea
          className="form-control mb-3"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Priority */}
        <label className="labelEdit">Priority</label>
        <select
          className="form-select mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Status */}
        <label className="labelEdit1">Status</label>
        <select
          className="form-select mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Button */}

        <button type="submit" className="btn btn-success w-100">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
