import https from "http";
import fs from "fs";

let file ;
const server = https.createServer((req, res)=>{
    if(req.url == "/"){
        file = "./index.html";
    }
    else if(req.url == "/about.html"){
        file = "./about.html";
    }

    fs.readFile(file, (err, content)=>{
        if(err){
            res.end("404 Not Found...");
        }
        else{
            res.end(content)
        }
    })
})
server.listen(8000, ()=>{
    console.log("Server is listening on port no : 8000");
})