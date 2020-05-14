exports.seed = async function(knex) {
  await knex("people").truncate();
  await knex("people").insert([
    { name: "anna" },
    { name: "walker" },
    { name: "blair" },
    { name: "gray" }
  ]);
};
