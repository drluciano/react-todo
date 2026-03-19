# Getting Started with Knex + PostgreSQL + Docker

A practical guide based on this project's setup: Express + Knex + PostgreSQL running in Docker, with environment variables managed via `.env`.

---

## Prerequisites

- Node.js installed
- Docker Desktop installed and running
- A `.env` file (see below)

---

## 1. Install Dependencies

From your server directory:

```bash
npm install knex pg dotenv
```

- `knex` — query builder and migration runner
- `pg` — PostgreSQL driver (Knex needs this under the hood)
- `dotenv` — loads your `.env` into `process.env`

---

## 2. Set Up Your `.env` File

Create a `.env` file in your server directory. Knex will read these values to connect to the database.

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

> **Never commit `.env` to git.** Add it to `.gitignore`.

---

## 3. Start PostgreSQL with Docker

This project uses a `docker-compose.yml` to run Postgres. The compose file reads from your `.env` automatically.

```yaml
# docker-compose.yml (already in this project)
services:
  db:
    image: postgres:17-alpine
    restart: unless-stopped
    ports:
      - "${DB_PORT:-5432}:5432"
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Start the container:

```bash
docker compose up -d
```

Verify it's running:

```bash
docker compose ps
```

---

## 4. Initialize Knex

Run `knex init` to generate a `knexfile.js` in your current directory:

```bash
npx knex init
```

This creates a boilerplate `knexfile.js`. Replace its contents with the configuration below, which reads from your `.env`:

```js
// knexfile.js
require("dotenv/config");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
```

> `require("dotenv/config")` at the top ensures `.env` is loaded before Knex reads `process.env`.

---

## 5. Connect Knex in Your Server

In `server.js`, require and instantiate Knex using the `development` config:

```js
require("dotenv").config();
const knex = require("knex")(require("./knexfile").development);
```

You can now use `knex` to query your database anywhere in the file.

---

## 6. Create a Migration

Migrations are versioned scripts that define your database schema. Generate one:

```bash
npx knex migrate:make migration_name
```

This creates a timestamped file in `./db/migrations/`. Open it and fill in `exports.up` (apply the change) and `exports.down` (reverse it):

```js
// db/migrations/20260318210713_01.js

exports.up = function (knex) {
  return knex.schema.createTable("User", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("pin").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("User");
};
```

**Key table builder methods:**

| Method | Description |
|---|---|
| `table.increments("id")` | Auto-incrementing integer primary key |
| `table.string("col")` | VARCHAR column |
| `table.integer("col")` | Integer column |
| `table.boolean("col")` | Boolean column |
| `table.timestamp("col")` | Timestamp column |
| `.notNullable()` | Adds NOT NULL constraint |
| `.unique()` | Adds UNIQUE constraint |
| `.defaultTo(knex.fn.now())` | Sets default to current timestamp |
| `.references("id").inTable("OtherTable")` | Foreign key |

---

## 7. Run Migrations

Apply all pending migrations to the database:

```bash
npx knex migrate:latest
```

To roll back the most recent batch:

```bash
npx knex migrate:rollback
```

> Knex tracks which migrations have run in a `knex_migrations` table it manages automatically.

---

## 8. Query the Database

With Knex connected, you can query your tables in route handlers:

```js
// SELECT all users
app.get("/users", async (req, res) => {
  const users = await knex("User").select("*");
  res.json(users);
});

// INSERT a new user
app.post("/users", async (req, res) => {
  const { name, email, pin } = req.body;
  const [newUser] = await knex("User")
    .insert({ name, email, pin })
    .returning("*");
  res.status(201).json(newUser);
});
```

**Common query patterns:**

```js
// WHERE clause
knex("User").where({ id: 1 }).first();

// UPDATE
knex("Task").where({ id: 5 }).update({ completed: true }).returning("*");

// DELETE
knex("Task").where({ id: 5 }).del();

// JOIN
knex("Task")
  .join("User", "Task.userId", "User.id")
  .select("Task.*", "User.name as userName");
```

---

## 9. (Optional) Create a Seed File

Seeds let you insert test/default data into your database:

```bash
npx knex seed:make seed_name
```

Run all seeds:

```bash
npx knex seed:run
```

> Seeds are not tracked like migrations — running them again will re-insert data. Design them with `onConflict` or truncation logic if needed.

---

## Quick Reference: Common Commands

| Command | What it does |
|---|---|
| `npx knex init` | Generate a `knexfile.js` |
| `npx knex migrate:make <name>` | Create a new migration file |
| `npx knex migrate:latest` | Run all pending migrations |
| `npx knex migrate:rollback` | Roll back the last batch of migrations |
| `npx knex seed:make <name>` | Create a new seed file |
| `npx knex seed:run` | Run all seed files |
| `docker compose up -d` | Start Postgres in the background |
| `docker compose down` | Stop and remove containers |

---

## Typical Startup Order

1. `docker compose up -d` — start Postgres
2. `npx knex migrate:latest` — apply schema
3. `npm start` — start the Express server
