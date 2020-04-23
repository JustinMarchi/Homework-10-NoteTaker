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

// app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/index.html"));
// });

// API GET Route
const noteData = require("./db/db.json");
const noteDataWithID = noteData.map((x, i) => ({ ...x, uniqueID: i,}));

app.get("/api/notes" , function(req, res) {
   return res.json(noteDataWithID);
});


// API POST Route
app.post("/api/notes", function(req, res) {
    noteDataWithID.push(req.body);
    return res.json
});

// Initiate Listener to start server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});