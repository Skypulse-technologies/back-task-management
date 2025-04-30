const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// Create a comment
router.post("/", async (req, res) => {
  const { content, taskId, projectId } = req.body;
  const userId = req.user?.id || 1; // fallback for MVP if auth isn't added yet

  if (!content || (!taskId && !projectId)) {
    return res.status(400).json({ error: "Content and either taskId or projectId are required" });
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        taskId,
        projectId,
        authorId: userId,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: { author: true },
      orderBy: { id: "desc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Get comments by task
router.get("/task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: Number(taskId) },
      include: { author: true },
      orderBy: { id: "desc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task comments" });
  }
});

// Get comments by project
router.get("/project/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { projectId: Number(projectId) },
      include: { author: true },
      orderBy: { id: "desc" },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project comments" });
  }
});

// Get single comment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comment" });
  }
});

// Update comment
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
});

// Delete comment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;
