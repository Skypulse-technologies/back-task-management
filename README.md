# 📘 Task Management API Documentation

# Project Setup and Requirements

## Requirements

Before starting, make sure you have the following installed on your machine:

1. **Docker**: The project uses Docker for setting up and managing the database. You can download it from [here](https://www.docker.com/products/docker-desktop).
2. **Node.js**: Ensure that you have Node.js installed. You can download it from [here](https://nodejs.org/).
3. **Git**: You'll need Git to clone the repository. You can download it from [here](https://git-scm.com/).

## Project Dependencies

This project depends on the following packages:

- **@prisma/client**: Prisma Client is an auto-generated and type-safe query builder for your database.
- **bcrypt**: A library for hashing and comparing passwords.
- **express**: A fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: A library for issuing and verifying JSON Web Tokens (JWT).
- **pg**: A PostgreSQL client for Node.js.
- **prisma**: The Prisma ORM to manage database schema and migrations.

To install the project dependencies, run:

```bash
npm install
```

---

# How to Start the Project

## Step 1: Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/Skypulse-technologies/back-task-management.git
cd back-task-management
```

## Step 2: Set Up the Database

The project uses Docker to manage the database.

### Start the Database:

To start the database, run the following command:

```bash
npm run database-start
```

This will set up the database container using `docker-compose`.

### Stop the Database:

To stop the database container, run the following command:

```bash
npm run database-finish
```

## Step 3: Run the Application

To start the application, run:

```bash
npm start
```

This will start the Node.js server, and the API will be accessible at `http://localhost:3000`.

---

# How to Use the API

Once the server is up and running, you can access the API endpoints as described in the [API Documentation](#). You can use tools like [Postman](https://www.postman.com/) to test the endpoints.

Here are some common commands you might find useful:

- **Start the server**: `npm start`
- **Start the database**: `npm run database-start`
- **Stop the database**: `npm run database-finish`

For any issues or bugs, please refer to the [GitHub Issues](https://github.com/Skypulse-technologies/back-task-management/issues) page.

---

## 🌍 Base URL

```
{{base_url}}  // Replace with your server URL, e.g., http://localhost:3000
```

---

## 👤 Users (`/users`)

### 🔹 Register a new user
**POST** `/users`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "PM"
}
```

### 🔹 Login
**POST** `/users/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### 🔹 Get all users
**GET** `/users`

### 🔹 Get a user by ID
**GET** `/users/:id`

### 🔹 Update a user
**PUT** `/users/:id`

```json
{
  "name": "Updated Name",
  "role": "User"
}
```

### 🔹 Delete a user
**DELETE** `/users/:id`

---

## 📁 Projects (`/projects`)

### 🔹 Create a project
**POST** `/projects`

```json
{
  "name": "Project A",
  "description": "A simple project",
  "status": "active",
  "pmId": 1
}
```

### 🔹 Get all projects
**GET** `/projects`

### 🔹 Get a project by ID
**GET** `/projects/:id`

### 🔹 Update a project
**PUT** `/projects/:id`

```json
{
  "status": "done"
}
```

### 🔹 Delete a project
**DELETE** `/projects/:id`

---

## ✅ Tasks (`/tasks`)

### 🔹 Create a task
**POST** `/tasks`

```json
{
  "title": "Task Title",
  "description": "Details",
  "status": "To Do",
  "assignedToId": 2,
  "projectId": 1,
  "deadline": "2025-05-10T23:59:00Z"
}
```

### 🔹 Get all tasks
**GET** `/tasks`

### 🔹 Get a task by ID
**GET** `/tasks/:id`

### 🔹 Update a task
**PUT** `/tasks/:id`

```json
{
  "status": "Done"
}
```

### 🔹 Delete a task
**DELETE** `/tasks/:id`

---

## 💬 Comments (`/comments`)

### 🔹 Create a comment
**POST** `/comments`

```json
{
  "content": "Comment text",
  "taskId": 1
}
```

### 🔹 Get all comments
**GET** `/comments`

### 🔹 Get a comment by ID
**GET** `/comments/:id`

### 🔹 Get comments for a task
**GET** `/comments/task/:taskId`

### 🔹 Get comments for a project
**GET** `/comments/project/:projectId`

### 🔹 Update a comment
**PUT** `/comments/:id`

```json
{
  "content": "Updated text"
}
```

### 🔹 Delete a comment
**DELETE** `/comments/:id`

---

## ⏱️ Time Logs (`/timelogs`)

### 🔹 Create a time log
**POST** `/timelogs`

```json
{
  "taskId": 1,
  "userId": 2,
  "date": "2025-04-30",
  "hours": 2.5
}
```

### 🔹 Get all time logs
**GET** `/timelogs`

### 🔹 Get a time log by ID
**GET** `/timelogs/:id`

### 🔹 Update a time log
**PUT** `/timelogs/:id`

```json
{
  "hours": 3
}
```

### 🔹 Delete a time log
**DELETE** `/timelogs/:id`
