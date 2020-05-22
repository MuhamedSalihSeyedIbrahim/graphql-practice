const Note = require("../models/note.model.js");

exports.noteService = {
  // Create and Save a new Note
  create: async (title, content) => {
    // Validate request
    if (!content) {
      throw { code: 400, message: "Note content can not be empty" };
    }

    try {
      // Create a Note
      const note = new Note({
        title: title || "Untitled Note",
        content: content,
      });

      // Save Note in the database
      const data = await note.save();
      return data;
    } catch (err) {
      throw {
        code: 500,
        message: err.message || "Some error occurred while creating the Note.",
      };
    }
  },

  // Retrieve and return all notes from the database.
  findAll: async () => {
    try {
      const notes = await Note.find();
      return notes;
    } catch (err) {
      throw {
        code: 500,
        message: err.message || "Some error occurred while creating the Note.",
      };
    }
  },

  // Find a single note with a noteId
  findOne: async (noteId) => {
    try {
      const note = await Note.findById(noteId);
      if (!note) {
        throw {
          code: 404,
          message: "Note not found with id " + noteId,
        };
      }
      return note;
    } catch (err) {
      if (err.kind === "ObjectId") {
        throw {
          code: 404,
          message: "Note not found with id " + noteId,
        };
      }
      throw {
        code: 500,
        message: "Error retrieving note with id " + noteId,
      };
    }
  },

  // Update a note identified by the noteId in the request
  update: async (noteId, title, content) => {
    // Validate Request
    if (!content) {
      throw { code: 400, message: "Note content can not be empty" };
    }

    try {
      // Find note and update it with the request body
      const note = await Note.findByIdAndUpdate(
        noteId,
        {
          title: title || "Untitled Note",
          content: content,
        },
        { new: true }
      );

      if (!note) {
        throw {
          code: 404,
          message: "Note not found with id " + noteId,
        };
      }
      return note;
    } catch (err) {
      if (err.kind === "ObjectId") {
        throw {
          code: 404,
          message: "Note not found with id " + noteId,
        };
      }
      throw {
        code: 500,
        message: "Error updating note with id " + noteId,
      };
    }
  },

  // Delete a note with the specified noteId in the request
  delete: async (noteId) => {
    try {
      const note = await Note.findByIdAndRemove(noteId);

      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + noteId,
        });
      }

      return { message: "Note deleted successfully!" };
    } catch (err) {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        throw {
          code: 404,
          message: "Note not found with id " + noteId,
        };
      }
      throw {
        code: 500,
        message: "Error updating note with id " + noteId,
      };
    }
  },
};
