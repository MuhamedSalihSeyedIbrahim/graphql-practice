const express = require("express");
const router = express.Router();

const { noteController } = require("../controllers/note.controller.js");

// Create a new Note
router.post("/notes", noteController.create);

// Retrieve all Notes
router.get("/notes", noteController.findAll);

// Retrieve a single Note with noteId
router.get("/notes/:noteId", noteController.findOne);

// Update a Note with noteId
router.put("/notes/:noteId", noteController.update);

// Delete a Note with noteId
router.delete("/notes/:noteId", noteController.delete);

module.exports = router;
