# 📘 Task Management API Documentation

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
