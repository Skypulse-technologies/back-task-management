const express = require('express');
const userRouter = require('./controllers/UserController');
const commentRoutes = require("./controllers/CommentController");
const taskRoutes = require("./controllers/TaskController");
const projectRoutes = require("./controllers/ProjectController");
const timeLogRoutes = require("./controllers/TimeLogController");

const app = express();
app.use(express.json());

app.use('/users', userRouter);
app.use("/comments", commentRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);
app.use("/timelogs", timeLogRoutes);

app.listen(3000, () => {
  console.log('Rodando na porta 3000');
});

