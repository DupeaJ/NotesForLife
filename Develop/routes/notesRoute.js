const notes = require("express").Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added successfully`);
    } else {
        res.errored("Error in adding note");
    }
});

notes.delete("/:id", async (req, res) => {
    const noteId = req.params.id;

    try {
        const data = await readFromFile("./db/db.json");
        const parsedData = JSON.parse(data);

        const noteIndex = parsedData.findIndex((note) => note.id === noteId);

        if (noteIndex === -1) {
            res.status(404).json({ error: "Note not found" });
        } else {
            parsedData.splice(noteIndex, 1);

            await writeToFile("./db/db.json", parsedData);

            res.status(204).json(parsedData);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = notes;
