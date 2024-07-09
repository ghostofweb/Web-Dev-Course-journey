import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.get("")

app.post("/submit", (req, res) => {
  const letters = req.body["fName"].length + req.body["lName"].length;
  res.render("index.ejs",{letters:letters});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
