const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get('/', (req, res) => {
  readFromFile('./config/database.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, note } = req.body;

  if (req.body) {
    const newNote = {
      title,
      note,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/tips.json');
    res.json(`Note added successfully`);
  } else {
    res.errored('Error in adding note')
  }
});


module.exports = notes;
