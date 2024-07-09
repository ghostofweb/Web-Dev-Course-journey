import express from "express"
const port = 3000;
const app = express();

app.get("/",(req,res)=>{
    res.send("home page");
})

app.post()


app.listen(port,()=>{
    console.log("the port "+port+" is on")
})