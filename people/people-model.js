const db = require("../data/config");

async function create(data) {
  const [id] = await db("people").insert(data);
  return findById(id);
}

async function update(id, data) {
  return db("people")
    .where({ id })
    .update(data);
}

function remove(id) {
  return db("people")
    .where("id", Number(id))
    .del();
}

function find() {
  return db("people");
}

function findById(id) {
  return db("people")
    .where("id", id)
    .first();
}

module.exports = {
  create,
  update,
  remove,
  find,
  findById
};
