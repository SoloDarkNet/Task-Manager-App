import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import PushNotification from "./PushNotification";
import TaskPieChart from "./PieChart/TaskPieChart";
import { useState } from "react";
import "../App.css";

const Dashboard = () => {
  const [task, setTask] = useState([]);
  const [chartFilter, setChartFilter] = useState(null);

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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <PushNotification />
          <TaskPieChart task={task} onFilterChange={setChartFilter} />
        </div>

        <TaskCard task={task} setTask={setTask} chartFilter={chartFilter} />
      </div>
    </div>
  );
};

export default Dashboard;
