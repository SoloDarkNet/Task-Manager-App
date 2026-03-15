import { useState } from "react";
import api from "../Services/app";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
    };
    try {
      const res = await api.post("/task/createTask", newTask);
      console.log(res);
      setTitle("");
      setDescription("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card p-3 mb-4 shadow">
      <h4>Add Task</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-success">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
