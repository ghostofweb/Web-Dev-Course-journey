import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));


app.get("/",(req,res)=>{
  res.render("index.ejs")
});


app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
/* Write your code here:



Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
