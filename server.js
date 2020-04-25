// Set up requirements
const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");


// Set up reading and writing files
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


// Set up Express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// HTML Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// API GET Route
const noteData = require("./db/db.json");

app.get("/api/notes" , function(req, res) {
    
    
   return res.json(noteData);
});


// API POST Route
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    for (i=0; i<noteData.length+1; i++) {
        newNote.id = i+1;
    }
    noteData.push(newNote);
    res.json(newNote);
});

app.delete("/api/notes/:id", function(req, res) {
    let noteID = req.params.id;
    
    for (i=0; i<noteData.length; i++) {
        if (noteID === noteData[i].id) {
            noteData.splice(i, 1);
        };
    };

    res.json(noteData);
});


// Initiate Listener to start server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});