import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "2004",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

async function checkVisited() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [currentUserId]
  );
  return result.rows.map(row => row.country_code);
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [currentUserId]);
  return result.rows[0];
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  const currentUser = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: await db.query("SELECT * FROM users").then(result => result.rows),
    color: currentUser.color
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length > 0) {
      const countryCode = result.rows[0].country_code;
      try {
        await db.query(
          "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
          [countryCode, currentUserId]
        );
        res.redirect("/");
      } catch (err) {
        console.log(err);
        res.status(500).send("Error inserting visited country");
      }
    } else {
      res.status(404).send("Country not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error querying country");
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = parseInt(req.body.user, 10);
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
      [name, color]
    );

    currentUserId = result.rows[0].id;

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating new user");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
