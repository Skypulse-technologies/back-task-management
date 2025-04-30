const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { name, description, status, pmId } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        pmId,
      },
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        pm: true,
        tasks: true,
        comments: true,
      },
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        pm: true,
        tasks: true,
        comments: true,
      },
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
});

router.put("/:id", async (req, res) => {
  const { name, description, status, pmId } = req.body;

  try {
    const project = await prisma.project.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        description,
        status,
        pmId,
      },
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
});

module.exports = router;
