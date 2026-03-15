import Navbar from "./Navbar";
import TaskCard from "./TaskCard";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4 fw-bold text-primary">
          My Tasks Dashboard
        </h2>

        <TaskCard />
      </div>
    </>
  );
};

export default Dashboard;
