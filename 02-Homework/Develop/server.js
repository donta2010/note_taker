var express = require("express");
var path = require("path");
var dbfunction = require("./db/dbFunctions.js")
const router = require("express").Router();
let fs = require("fs");
const helperFunction = new dbfunction()
console.log(helperFunction)
//for the helper function, we need to tell the code where to get
//the class from, that is why we wrote dbfunction.

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3560 ||process.env.PORT; // we need to add -process.envPOT

let db=require("./db/db.json");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let sentNotes =[];


app.use(express.static("public"));

console.log("Hello World");

app.get("/api/notes", async function(req, res){
    try{
        const notes = await helperFunction.getNotes();
        res.json(notes)
        console.log("line 31",notes);
    }catch(err){
        throw err;
    }
}) 

//when you send the file make sure the path is right
//../ is going out of a folder-- ./ is a sibling/on the same level

app.post("/api/notes", function(req, res){
    //front end is sending the request to the API then to the backend
     const newNote=req.body
     console.log(req.body);
     helperFunction.writeNotes(newNote);
     res.sendFile(path.join(__dirname,"db", "db.json"));
    //dbfunction writeNote is from the dbfunction.js 
    //we are taking in notes from index.js front end and we are posting 
    //the note with the write note function
    res.send(newNote)
    
    })
router.delete("/notes/:id", (req, res) => {
    res.json(dbfunction.deleteNote(req.params.id));
  });

  app.get("/notes", function(req, res){
    console.log("dirname",__dirname);
    res.sendFile(path.join(__dirname,"public", "notes.html"));
})
app.get("/", function(req, res){

    console.log("dirname",__dirname);
    res.sendFile(path.join(__dirname,"public", "index.html"));
})
app.get("*", function(req, res){

    console.log("dirname",__dirname);
    res.sendFile(path.join(__dirname,"public", "index.html"));
})
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });