const express = require("express");
const { body, validationResult } = require("express-validator");
const NoteController = require("../controllers/NoteController");
const { validate } = require("../models/Note");
const router = express.Router();
const handleErrorMessage = require("../middlewares/handleErrorMessage");
router.get("", NoteController.index);
router.post(
  "",
  body("title").notEmpty(),
  body("description").notEmpty(),
  handleErrorMessage,
  NoteController.store
);
router.get("/:id", NoteController.show);
router.delete("/:id", NoteController.destroy);
router.patch("/:id", NoteController.update);

module.exports = router;
