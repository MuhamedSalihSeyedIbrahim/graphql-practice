const { noteService } = require("../services/note.service");

exports.noteController = {
  // Create and Save a new Note
  create: async (req, res) => {
    try {
      const { content, title } = req.body;
      const createRes = await noteService.create(content, title);

      return res.status(201).send(createRes);
    } catch (err) {
      const { code, message } = err;

      return res.status(code || 500).send({
        message: message || "internal server error",
      });
    }
  },

  // Retrieve and return all notes from the database.
  findAll: async (_, res) => {
    try {
      const findAllRes = await noteService.findAll();

      return res.status(200).send(findAllRes);
    } catch (err) {
      const { code, message } = err;

      return res.status(code || 500).send({
        message: message || "internal server error",
      });
    }
  },

  // Find a single note with a noteId
  findOne: async (req, res) => {
    try {
      const { noteId } = req.params;
      const findOneRes = await noteService.findOne(noteId);

      return res.status(200).send(findOneRes);
    } catch (err) {
      const { code, message } = err;

      return res.status(code || 500).send({
        message: message || "internal server error",
      });
    }
  },

  // Update a note identified by the noteId in the request
  update: async (req, res) => {
    try {
      const { noteId } = req.params;
      const { content, title } = req.body;

      const updateRes = await noteService.update(noteId, title, content);

      return res.status(200).send(updateRes);
    } catch (err) {
      const { code, message } = err;

      return res.status(code || 500).send({
        message: message || "internal server error",
      });
    }
  },

  // Delete a note with the specified noteId in the request
  delete: async (req, res) => {
    try {
      const { noteId } = req.params;

      const deleteRes = await noteService.delete(noteId);

      return res.status(200).send(deleteRes);
    } catch (err) {
      const { code, message } = err;

      return res.status(code || 500).send({
        message: message || "internal server error",
      });
    }
  },
};
