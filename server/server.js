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
  const { name, email, pin } = req.body;

  const hashedPassword = await bcrypt.hash(pin, 12);

  const [newUser] = await knex("User")
    .insert({ name, email, pin: hashedPassword })
    .returning("*");
  res.status(201).json(newUser);
});

app.get("/users/:userId", (req, res) => {
  const { id, name, email, pin } = res.body;
});
