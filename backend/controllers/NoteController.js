const Note = require("../models/Note");
const mongoose = require("mongoose");

const NoteController = {
  index: async (req, res) => {
    let limit = 5;
    let page = req.query.page || 1;

    let notes = await Note.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    let totalNotesCount = await Note.countDocuments();
    let totalPagesCount = Math.ceil(totalNotesCount / limit);

    let links = {
      nextPage: totalPagesCount == page ? false : true,
      previousPage: page == 1 ? false : true,
      currentPage: page,
      loopableLinks: [],
    };
    for (let index = 0; index < totalPagesCount; index++) {
      let number = index + 1;
      links.loopableLinks.push({ number });
    }
    let response = {
      links,
      data: notes,
    };
    return res.json(response);
  },
  store: async (req, res) => {
    const { title, description } = req.body;
    const note = await Note.create({
      title,
      description,
    });
    return res.json(note);
  },
  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }
      let note = await Note.findById(id);
      if (!note) {
        return res.status(404).json({ msg: "note not found!" });
      }
      return res.json(note);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }
      let note = await Note.findByIdAndDelete(id);
      if (!note) {
        return res.status(404).json({ msg: "note not found!" });
      }
      return res.json(note);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }
      let note = await Note.findByIdAndUpdate(id, { ...req.body });
      if (!note) {
        return res.status(404).json({ msg: "note not found!" });
      }
      return res.json(note);
    } catch (e) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
};

module.exports = NoteController;
