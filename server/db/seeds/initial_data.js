/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("Archive").del();
  await knex("Task").del();
  await knex("Subtype").del();
  await knex("Type").del();
  await knex("User").del();

  const [alice, bob] = await knex("User").insert([
    { email: "alice@example.com", name: "Alice", pin: "hashed_pin_1", avatarSeed: "alice" },
    { email: "bob@example.com", name: "Bob", pin: "hashed_pin_2", avatarSeed: "bob" },
  ]).returning("id");

  const [personal, household] = await knex("Type").insert([
    { name: "Personal" },
    { name: "Household" },
  ]).returning("id");

  const [errand, health, cleaning, shopping] = await knex("Subtype").insert([
    { name: "Errand", typeId: personal.id },
    { name: "Health", typeId: personal.id },
    { name: "Cleaning", typeId: household.id },
    { name: "Shopping", typeId: household.id },
  ]).returning("id");

  await knex("Task").insert([
    { task: "Buy groceries", userId: alice.id, typeId: household.id, subtypeId: shopping.id, completed: false, completedById: null, archived: false },
    { task: "Go for a run", userId: alice.id, typeId: personal.id, subtypeId: health.id, completed: false, completedById: null, archived: false },
    { task: "Vacuum living room", userId: bob.id, typeId: household.id, subtypeId: cleaning.id, completed: false, completedById: null, archived: false },
    { task: "Pick up prescription", userId: bob.id, typeId: personal.id, subtypeId: errand.id, completed: true, completedById: alice.id, archived: false },
  ]);
};
