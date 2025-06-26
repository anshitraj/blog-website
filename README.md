# 📝 RBAC Blog Platform

A full-stack blog application with **Role-Based Access Control (RBAC)** using **React.js**, **Node.js**, **Express**, and **MongoDB**. This project demonstrates secure authentication, role-based authorization, and dynamic blog management.

---

## 🚀 Features

- ✅ User & Admin roles with JWT authentication
- 🧑‍💻 Role-based route access using middleware
- 📚 Users can view blogs
- 🛠️ Admins can create, update, and delete blog posts
- 🔐 Passwords hashed with bcrypt
- 🌐 Responsive frontend using React
- 📄 MongoDB schema for users and blog posts

---

## 🏗️ Tech Stack

**Frontend**:
- React.js
- Axios
- React Router

**Backend**:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcrypt for password hashing

---

## 🧩 Project Structure

pixel-blog-forge/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── .env
│ └── server.js
├── frontend/
│ ├── public/
│ └── src/
│ ├── pages/
│ ├── components/
│ └── App.jsx

yaml
Copy
Edit

---

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/anshitraj/blog-website.git
cd blog-website
2. Setup the backend
bash
Copy
Edit
cd backend
npm install
Create a .env file in backend/:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start backend:

bash
Copy
Edit
npm run dev
3. Setup the frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
The frontend will be running at http://localhost:3000
The backend will be running at http://localhost:5000

📘 API Endpoints
Auth
POST /api/signup – Register user

POST /api/login – Login and receive JWT

Blogs
GET /api/posts – View all blog posts (public)

POST /api/posts – Create post (admin only)

PUT /api/posts/:id – Edit post (admin only)

DELETE /api/posts/:id – Delete post (admin only)

📌 Roles
Role	Permissions
User	View posts
Admin	Create, update, delete posts

📩 Optional Features
Email verification with Nodemailer (coming soon)

Rich text editing

Image uploads

Real-time updates (WebSocket)

🧑‍💻 Author
Made by Anshit Raj

📄 License
MIT License
