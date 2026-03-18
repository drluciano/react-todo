require("dotenv").config();
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
