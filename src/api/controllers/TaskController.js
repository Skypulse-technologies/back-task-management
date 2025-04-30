const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { title, description, status, deadline, projectId, assignedToId } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        deadline: new Date(deadline),
        projectId,
        assignedToId,
      },
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: true,
        project: true,
      },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        assignedTo: true,
        project: true,
      },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});

router.put("/:id", async (req, res) => {
  const { title, description, status, deadline, assignedToId } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        status,
        deadline: deadline ? new Date(deadline) : undefined,
        assignedToId,
      },
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.task.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
});

module.exports = router;
