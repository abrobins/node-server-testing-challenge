const db = require("../data/config");

async function create(data) {
  const [id] = await db("people").insert(data);
  return findById(id);
}

async function update(id, data) {
  return null;
}

function remove(id) {
  return null;
}

function find() {
  return db("people");
}

function findById(id) {
  return (
    db("people")
      .where("id", id)
      // .first same as calling .limit(1) and .select() and destructuring first element from array.
      .first()
  );
}

module.exports = {
  create,
  update,
  remove,
  find,
  findById
};
