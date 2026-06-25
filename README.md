# 📝 Task Manager App

A full-stack **Task Management Web Application** built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.
This app helps users manage their daily tasks with features like authentication, task creation, filtering, and status tracking.

---

## 🚀 Live Demo

* https://task-manager-app-gold-nine.vercel.app/
---

## 📌 Features

* 🔐 User Authentication (Register & Login)
* ➕ Create, Update, Delete Tasks
* Implement AI Task Suggestion features
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

Copy `Server/.env.example` to `Server/.env` and update the values:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
VAPID_EMAIL=mailto:you@example.com
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
PORT=5000
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

### AI Routes

  * Post `/api/ai/suggestions`

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
