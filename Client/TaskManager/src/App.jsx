import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//lazy loading add

const Login = lazy(() => import("./Components/Login/Login"));
const Register = lazy(() => import("./Components/Register/register"));
const Dashboard = lazy(() => import("./Components/Dashboard"));
const ProtectedRoute = lazy(
  () => import("./Components/ProtectedRoute/protectedRoute"),
);
import NotFound from "./Components/Notfound/Notfound";
import DelayedFallback from "../DelayedFallback";
const TaskForm = lazy(() => import("./Components/TaskForm"));

const App = () => {
  const Loader = () => (
    <div className="d-flex justify-content-center align-items-center py-4 flex-column">
      <div className="spinner-border text-primary mb-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Suspense fallback={Loader()}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
