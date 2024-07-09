const fs = require("fs")
/*
fs.writeFile("messagee.txt","hello world",(err)=>{
    if(err) throw err;
    console.log("the file has been saved");
});
*/

fs.readFile("messagee.txt","utf8",(err, data) => {
    if (err) throw err;
    console.log(data);});