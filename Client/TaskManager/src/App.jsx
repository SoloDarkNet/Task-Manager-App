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
  return (
    <BrowserRouter>
      <Suspense fallback={<DelayedFallback />}>
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
