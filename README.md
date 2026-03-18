# 📝 Task Manager App

A full-stack **Task Management Web Application** built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.
This app helps users manage their daily tasks with features like authentication, task creation, filtering, and status tracking.

---

## 🚀 Live Demo

*  https://task-manager-applications.onrender.com
---

## 📌 Features

* 🔐 User Authentication (Register & Login)
* ➕ Create, Update, Delete Tasks
* 📊 Task Status Management (Pending, Completed)
* 🎯 Priority-based Filtering
* 🔍 Search Tasks
* 🛡️ Protected Routes
* 📱 Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Bootstrap / CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📂 Project Structure

```
TaskManagerApp/
│
├── Client/TaskManager   # Frontend (React)
├── Server               # Backend (Node + Express)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/Task-Manager-App.git
cd Task-Manager-App
```

---

### 2️⃣ Setup Backend

```
cd Server
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```
node server.js
```

---

### 3️⃣ Setup Frontend

```
cd Client/TaskManager
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth Routes

* POST `/api/auth/register`
* POST `/api/auth/login`

### Task Routes

* GET `/api/task`
* POST `/api/task/createTask`
* PUT `/api/task/:id`
* DELETE `/api/task/:id`

---

## 🚀 Deployment
* deployed on **Render**

---

## 📸 Screenshots

(Add screenshots here)

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork this repo and submit a pull request.

---

## 📧 Contact

* 👤 Name: Solomon
* 💼 GitHub: https://github.com/SoloDarkNet

---

## ⭐ Support

If you like this project, please ⭐ the repository!
