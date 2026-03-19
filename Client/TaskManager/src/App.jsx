import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/register";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute/protectedRoute";
import NotFound from "./Components/Notfound/Notfound";
import TaskForm from "./Components/TaskForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/taskForm"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{
          borderRadius: "12px",
          fontFamily: "inherit",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
        style={{
          top: "70px",
        }}
      />
    </BrowserRouter>
  );
};

export default App;
