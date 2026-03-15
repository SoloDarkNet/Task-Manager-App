import Login from "./Components/Login/Login";
import Register from "./Components/Register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskForm from "./Components/TaskForm";
import TaskCard from "./Components/TaskCard";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/taskForm" element={<TaskForm />} />
        <Route path="/getTask" element={<TaskCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
