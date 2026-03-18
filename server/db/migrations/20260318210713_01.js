/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("User", (table) => {
      table.increments("id").primary();
      table.string("email").notNullable().unique();
      table.string("name").notNullable();
    })
    .createTable("Type", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })
    .createTable("Subtype", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.integer("typeId").notNullable().references("id").inTable("Type");
    })
    .createTable("Task", (table) => {
      table.increments("id").primary();
      table.string("task").notNullable();
      table.integer("userId").notNullable().references("id").inTable("User");
      table.integer("typeId").notNullable().references("id").inTable("Type");
      table
        .integer("subtypeId")
        .notNullable()
        .references("id")
        .inTable("Subtype");
      table.boolean("completed").notNullable();
      table
        .integer("completedById")
        .notNullable()
        .references("id")
        .inTable("User");
      table.timestamp("lastUpdated").defaultTo(knex.fn.now());
      table.boolean("archived").notNullable();
    })
    .createTable("Archive", (table) => {
      table.increments("id").primary();
      table
        .integer("archivedTaskId")
        .notNullable()
        .references("id")
        .inTable("Task");
      table.timestamp("archivedAt").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("Archive")
    .dropTableIfExists("Task")
    .dropTableIfExists("Subtype")
    .dropTableIfExists("Type")
    .dropTableIfExists("User");
};
