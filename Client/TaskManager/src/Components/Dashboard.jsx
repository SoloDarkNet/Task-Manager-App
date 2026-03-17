import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import "../App.css";

const Dashboard = () => {
  return (
    <div className="bgContainer">
      <Navbar />

      <div className="container mt-4 dashboard-container">
        <h2 className="text-center mb-4 pt-3 fw-bold">My Tasks Dashboard</h2>
        <TaskCard />
      </div>
    </div>
  );
};

export default Dashboard;
