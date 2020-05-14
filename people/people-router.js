const express = require("express");
const People = require("./people-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await People.find());
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const person = await People.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person was not found" });
    }

    res.json(person);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const person = await People.create(req.body);
    res.status(201).json(person);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  People.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find person with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete person" });
    });
});

module.exports = router;
