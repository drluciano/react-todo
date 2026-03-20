require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;
const knex = require("knex")(require("./knexfile").development);

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

app.get("/users", async (req, res) => {
  const users = await knex("User").select("*");
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email, pin, avatarSeed } = req.body;

  const hashedPassword = await bcrypt.hash(pin, 12);

  const [newUser] = await knex("User")
    .insert({ name, email, pin: hashedPassword, avatarSeed })
    .returning("*");
  res.status(201).json(newUser);
});

app.get("/tasks", async (req, res) => {
  const { id } = req.query;
  const tasks = await knex("Task").where({ userId: id }).select("*");
  res.json(tasks);
});

app.get("/types", async (req, res) => {
  const types = await knex("Type").select("*");
  res.json(types);
});

app.get("/subtypes", async (req, res) => {
  const subtypes = await knex("Subtype").select("*");
  res.json(subtypes);
});

app.post("/tasks", async (req, res) => {
  const {
    task,
    userId,
    typeId,
    subtypeId,
    completed,
    completedById,
    lastUpdated,
    archived,
  } = req.body;

  const [newTask] = await knex("Task")
    .insert({
      task,
      userId,
      typeId,
      subtypeId,
      completed,
      completedById,
      lastUpdated,
      archived,
    })
    .returning("*");

  res.status(201).json(newTask);
});
