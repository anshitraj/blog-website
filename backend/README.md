# Pixel Blog Forge Backend

This is the backend for the Pixel Blog Forge application, built with Node.js, Express, and MongoDB.

## Features

- JWT authentication (signup/login)
- User roles: `user` (default), `admin`
- Admins can create, edit, delete blog posts
- Any logged-in user can view blog posts

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your values:
   ```env
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_uri_here
   ```
3. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

### Auth

- `POST /api/auth/signup` — Signup (body: name, email, password)
- `POST /api/auth/login` — Login (body: email, password)

### Blog Posts

- `GET /api/posts` — View all posts (auth required)
- `POST /api/posts` — Create post (admin only)
- `PUT /api/posts/:id` — Edit post (admin only)
- `DELETE /api/posts/:id` — Delete post (admin only)

## Folder Structure

- `models/` — Mongoose schemas
- `controllers/` — Business logic
- `routes/` — Express routes
- `middleware/` — Auth & role middleware
- `config/` — DB connection
