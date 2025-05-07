const express = require('express');
const userRouter = require('./controllers/UserController');
const commentRoutes = require("./controllers/CommentController");
const taskRoutes = require("./controllers/TaskController");
const projectRoutes = require("./controllers/ProjectController");
const timeLogRoutes = require("./controllers/TimeLogController");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



app.use('/users', userRouter);
app.use("/comments", commentRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);
app.use("/timelogs", timeLogRoutes);


app.listen(8000, () => {
  console.log('Rodando na porta 3000');
});

