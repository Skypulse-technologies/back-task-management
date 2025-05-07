const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { title, description, status, deadline, projectId, assignedEmails } = req.body;

  try {
    let assigneeData = {};

    if (assignedEmails && assignedEmails.length > 0) {
      const users = await prisma.user.findMany({
        where: {
          email: { in: assignedEmails },
        },
      });

      if (users.length === 0) {
        return res.status(400).json({ error: "Nenhum usuário encontrado com os e-mails fornecidos." });
      }

      assigneeData = {
        assignees: {
          connect: users.map((user) => ({ id: user.id })),
        },
      };
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        deadline: deadline ? new Date(deadline) : undefined,
        projectId,
        ...assigneeData,
      },
      include: {
        assignees: true,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Erro ao criar tarefa:", err);
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
});


router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignees: true,
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
        assignees: true,
        project: true,
      },
    });
    res.json(task);
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
});

router.put("/:id", async (req, res) => {
  const { title, description, status, deadline, assignedEmails } = req.body;

  try {
    const taskId = Number(req.params.id);

    let assigneeData = undefined;

    if (Array.isArray(assignedEmails) && assignedEmails.length > 0) {
      const users = await prisma.user.findMany({
        where: {
          email: { in: assignedEmails },
        },
      });

      assigneeData = {
        set: users.map((user) => ({ id: user.id })),
      };
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        status,
        deadline: deadline ? new Date(deadline) : undefined,
        ...(assigneeData && { assignees: assigneeData }),
      },
      include: {
        assignees: true,
      },
    });

    res.json(task);
  } catch (err) {
    console.error("Erro ao atualizar tarefa:", err);
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

router.get("/status/summary", async (req, res) => {
  const { userId, email } = req.query;

  if (!userId || !email) {
    return res.status(400).json({ error: "userId e email são obrigatórios." });
  }

  try {
    // Inicializando a consulta com `groupBy` para contar por status
    const summary = await prisma.task.groupBy({
      by: ["status"],
      _count: {
        _all: true,
      },
      where: {
        OR: [
          {
            project: {
              pmId: Number(userId),  // Filtra por PM do projeto
            },
          },
          {
            assignees: {
              some: {
                email: email,  // Filtra por e-mail de assignee
              },
            },
          },
        ],
      },
    });

    // Convertendo o resultado para um formato de objeto com status como chave
    const result = summary.reduce((acc, item) => {
      acc[item.status] = item._count._all;  // Conta o número de tarefas em cada status
      return acc;
    }, {});

    res.json(result);
  } catch (err) {
    console.error("Erro ao gerar resumo por status:", err);
    res.status(500).json({ error: "Erro ao gerar resumo por status" });
  }
});
