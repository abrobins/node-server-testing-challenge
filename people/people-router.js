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

module.exports = router;
