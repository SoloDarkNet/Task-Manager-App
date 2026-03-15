import { useEffect, useState } from "react";
import api from "../Services/app";
import Navbar from "./Navbar";

const TaskCard = () => {
  const [task, setTask] = useState([]);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editId, setEditId] = useState(null);

  const getTask = async () => {
    try {
      const res = await api.get("/task/allTask");
      setTask(res.data.getTask);
      console.log(task);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (card) => {
    setEditId(card._id);
    setEditTaskTitle(card.title);
    setEditTask(card.description);
  };

  const UpdateTask = async () => {
    try {
      await api.put(`/task/updateTask/${editId}`, {
        title: editTaskTitle,
        description: editTask,
      });
      getTask();
      setEditTask("");
      setEditTaskTitle("");
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

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="container mt-4">
          <div className="row">
            {task.map((card) => (
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
                        <h5 className="card-title text-primary fw-bold">
                          {card.title}
                        </h5>

                        <p className="card-text text-muted">
                          {card.description}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
