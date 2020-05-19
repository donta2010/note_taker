const util=require("util");
//util are node utility function. if we need a promise and somrhting is not naturally a function then we need util
//https://nodejs.org/api/util.html
//https://nodejs.org/api/fs.html
const fs=require("fs");
let a = {count: 0}
//fs=filesystem it allows you to interact with the system you are currently, you can read, write, and append
//it allows intation with the node
const readFileAsync =util.promisify(fs.readFile);
const appendFile=util.promisify(fs.appendFile);
const writeFileAsync=util.promisify(fs.writeFile);
//to promisify something you need util.promisfy

class DbFunctions{
    //using a class becuase it is easy to make copies and send
    async readNotes(){
    try{
    return await readFileAsync("db.json", "utf8")
    }
    catch (err){
        throw err;
    }
}

async writeNotes(note){
    try{
        // readFileAsync("db.json")
//         readFile = ...
// if readFile.count
// 	newCount = readFile.count++
//     readFile.newCount = newNote
// //     save()
//         const JSON1 =JSON.stringify(note)
//         arr.push(JSON1)
let file = await readFileAsync("db.json");
console.log("File count",file.count);
console.log(`FILE: ${file}`)
// if(!file && !file.count)
// {
    file ={count:0};
    console.log("File count",file.count);
    console.log(`FILE: ${file}`)
    console.log("FILE:", JSON.parse(file))
    file[file.count.toString()] = JSON.stringify(note);

    console.log("to string", file.count.toString());
    console.log("stringy", JSON.stringify(note))
    return await writeFileAsync("db.json", file);

// }
// else {file.count++;
//     file[file.count.toString()] = JSON.stringify(note);
//     console.log("to string", file.count.toString());
//     console.log("stringy", JSON.stringify(note))
//     return await appendFile("db.json", file);

//     }
    }
    
    catch (err){
        throw err;
    }
}
 async getNotes(){
        try{
            const notes =await this.readNotes();
            console.log("notes",notes);
        return notes;
        }
        catch (err){
            throw err;
        }
    }
    async addNotes(){
    //this function is going to pull all of our notes
    //we use getnotes to get all of our notes
    //we read the notes, save it, push it to the array
    //override the old array of notes with the new array of notes
        try{
            const notes = await this.getNotes();
            notes.push(note);
            return notes;
        }
        catch(err){
            throw err
        }

    }
}

module.exports= DbFunctions; 