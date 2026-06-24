import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import PushNotification from "./PushNotification";
import TaskPieChart from "./PieChart/TaskPieChart";
import TaskForm from "./TaskForm";
import "../App.css";

const Dashboard = () => {
  const [task, setTask] = useState([]);
  const [chartFilter, setChartFilter] = useState(null);
  const navigate = useNavigate();

  const onAddTask = () => {
    navigate("/taskForm");
    console.log("CLick Add Task");
  };

  return (
    <div className="bgContainer">
      <Navbar />
      <div className="container mt-4 dashboard-container">
        <h2
          className="text-center pt-3 fw-bold dashBoardHeading"
          style={{ marginTop: "30px" }}
        >
          My Tasks Dashboard
        </h2>

        {/* Top row — 2 buttons */}
        <div className="action1-buttons">
          <PushNotification />
          <button onClick={() => onAddTask()} className="gradient-btn">
            Add Task
          </button>

          <TaskPieChart task={task} onFilterChange={setChartFilter} />
        </div>
        <TaskCard task={task} setTask={setTask} chartFilter={chartFilter} />
      </div>
    </div>
  );
};

export default Dashboard;
