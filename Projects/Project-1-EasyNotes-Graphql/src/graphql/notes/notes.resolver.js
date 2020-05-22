const Note = require("../../models/note.model");

exports.root = {
  // Retrieve and return all notes from the database.
  findAll: async () => {
    try {
      const notes = await Note.find();
      return notes;
    } catch (err) {
      throw new Error(
        "Some error occurred while creating the Note."
      );
    }
  },

  // Find a single note with a noteId
  findOne: async ({ noteId }) => {
    try {
      const note = await Note.findById(noteId);
      if (!note) {
        throw new Error("Note not found with id " + noteId);
      }
      return note;
    } catch (err) {
      if (err.kind === "ObjectId") {
        throw new Error("Note not found with id " + noteId);
      }

      throw new Error("Error retrieving note with id " + noteId);
    }
  },

  // Create and Save a new Note
  create: async (args) => {
    console.log(args.note);
    const { content, title } = args.note;
    // Validate request
    if (!content) {
      throw new Error("Note content can not be empty");
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
      throw new Error(
        "Some error occurred while creating the Note."
      );
    }
  },

  // Update a note identified by the noteId in the request
  update: async (args) => {
    // Validate Request
    const { _id: noteId, title, content } = args.note;
    if (!content) {
      throw new Error("Note content can not be empty");
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
        throw new Error("Note not found with id " + noteId);
      }
      return note;
    } catch (err) {
      if (err.kind === "ObjectId") {
        throw new Error("Note not found with id " + noteId);
      }
      throw new Error("Error updating note with id " + noteId);
    }
  },

  // Delete a note with the specified noteId in the request
  delete: async ({ noteId }) => {
    try {
      const note = await Note.findByIdAndRemove(noteId);

      if (!note) {
        throw new Error("Note not found with id " + noteId);
      }

      return { message: "Note deleted successfully!" };
    } catch (err) {
      if (err.kind === "ObjectId") {
        throw new Error("Note not found with id " + noteId);
      }
      throw new Error("Error updating note with id " + noteId);
    }
  },
};
