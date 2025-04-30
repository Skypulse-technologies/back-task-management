const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { taskId, userId, date, hours } = req.body;

  try {
    const timeLog = await prisma.timeLog.create({
      data: {
        taskId,
        userId,
        date: new Date(date),
        hours,
      },
    });
    res.status(201).json(timeLog);
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar horas" });
  }
});

router.get("/", async (req, res) => {
  try {
    const logs = await prisma.timeLog.findMany({
      include: {
        task: true,
        user: true,
      },
      orderBy: { date: "desc" },
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar registros de horas" });
  }
});

router.get("/task/:taskId", async (req, res) => {
  try {
    const logs = await prisma.timeLog.findMany({
      where: { taskId: Number(req.params.taskId) },
      include: { user: true },
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar logs da tarefa" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const logs = await prisma.timeLog.findMany({
      where: { userId: Number(req.params.userId) },
      include: { task: true },
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar logs do usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.timeLog.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar log de horas" });
  }
});

module.exports = router;
