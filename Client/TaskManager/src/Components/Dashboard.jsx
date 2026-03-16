import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import "../App.css";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-4" id="dashboard-container">
        <h2 className="text-center mb-4 fw-bold">My Tasks Dashboard</h2>
        <TaskCard />
      </div>
    </>
  );
};

export default Dashboard;
