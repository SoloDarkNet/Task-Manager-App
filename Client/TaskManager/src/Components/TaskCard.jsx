import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/app";
import SearchFilter from "./FilterTask/filterTask";
import CountStatusContainer from "./CountStatus/ConutStatusContainer";

const TaskCard = () => {
  const [task, setTask] = useState([]);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const getTask = async () => {
    try {
      const res = await api.get("/task/allTask");
      setTask(res.data.getTask);
      console.log(res.data.getTask);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (card) => {
    setEditId(card._id);
    setEditTaskTitle(card.title);
    setEditTask(card.description);
    setEditStatus(card.status);
    setPriority(card.priority);
  };

  const UpdateTask = async () => {
    try {
      await api.put(`/task/updateTask/${editId}`, {
        title: editTaskTitle,
        description: editTask,
        priority: priority,
        status: editStatus,
      });
      getTask();
      setEditTask("");
      setEditTaskTitle("");
      setEditStatus("");
      setPriority("");
      setEditId(null);
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteTask = async (id) => {
    try {
      await api.delete(`/task/deletedTask/${id}`);

      getTask();
    } catch (e) {
      console.log(e);
    }
  };

  const FilterTask = task.filter((task) => {
    const regex = new RegExp(search, "i");

    return (
      regex.test(task.title) ||
      regex.test(task.description) ||
      regex.test(task.status) ||
      regex.test(task.priority)
    );
  });

  useEffect(() => {
    getTask();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "btn btn-warning";
      case "High":
        return "btn btn-danger";
      case "Medium":
        return "btn btn-success";
      default:
        return "btn btn-secondary";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-warning";
      case "pending":
        return "text-danger";
      case "Pending":
        return "text-danger";
      case "Completed":
        return "text-success";
      default:
        return "text-secondary";
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return minutes + " minutes ago";
    if (hours < 24) return hours + " hours ago";
    if (days === 1) return "Yesterday";
    if (days < 7) return days + " days ago";

    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="container mt-4">
          <div className="row">
            <SearchFilter search={search} setSearch={setSearch} />
            <CountStatusContainer task={task} />
            {task.length === 0 ? (
              <div className="text-center mt-5 p-5 border rounded bg-light">
                <h4>No Tasks Yet 🚀</h4>
                <p>Start by creating your first task</p>

                <button
                  className="btn btn-success"
                  onClick={() => navigate("/taskForm")}
                >
                  + Add Task
                </button>
              </div>
            ) : (
              FilterTask.map((card) => (
                <div className="col-md-4 mb-4" key={card._id}>
                  <div className="card shadow-lg border-0 h-100">
                    <div className="card-body">
                      {editId === card._id ? (
                        <>
                          <input
                            className="form-control mb-2"
                            value={editTaskTitle}
                            onChange={(e) => setEditTaskTitle(e.target.value)}
                          />

                          <textarea
                            className="form-control mb-3"
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                          />
                          <select
                            className="form-control mb-2"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>

                          <select
                            className="form-control mb-2"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>

                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={UpdateTask}
                          >
                            Save
                          </button>

                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <h5
                            className={
                              card.status === "Completed"
                                ? "mb-3 opacity-50 text-success"
                                : "card-title text-primary fw-bold"
                            }
                          >
                            {card.title}
                          </h5>

                          <p
                            className={
                              card.status === "Completed"
                                ? " mb-3 opacity-50 text-secondary"
                                : "card-title text-secondary fw-light"
                            }
                          >
                            {card.description}
                          </p>
                          <div className="d-flex flex-row justify-content-between">
                            <p className={getStatusColor(card.status)}>
                              <span style={{ color: "#5d5d5d" }}> Status:</span>{" "}
                              {card.status}
                            </p>
                            <div>
                              <button
                                className={getPriorityColor(card.priority)}
                              >
                                {card.priority}
                              </button>
                            </div>
                          </div>
                          <p
                            className="text-dark"
                            style={{ fontSize: "12px", fontWeight: "500" }}
                          >
                            Created: {timeAgo(card.createdAt)}
                          </p>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleSubmit(card)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm ms-2"
                            onClick={() => DeleteTask(card._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
