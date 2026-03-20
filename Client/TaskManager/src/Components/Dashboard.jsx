import Navbar from "./Navbar";
import TaskCard from "./TaskCard";
import PushNotification from "./PushNotification";
import "../App.css";

const Dashboard = () => {
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
        <PushNotification />
        <TaskCard />
      </div>
    </div>
  );
};

export default Dashboard;
