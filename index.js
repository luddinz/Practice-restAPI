const express = require("express");
const articles = require("./dataGames");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/articles", (req, res) => {
  res.status(200).json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((e) => e.id === Number(req.params.id));
  res.status(200).json(article);
});

app.post("/api/articles", (req, res) => {
  // Destructuring
  const { nameGame, typeOf, typeConnection } = req.body;

  // Dapatkan ID dari Artikel terakhir
  const lastID = articles[articles.length - 1].id;
  const newID = lastID + 1;

  const article = {
    id: newID,
    nameGame: nameGame,
    typeOf: typeOf,
    typeConnection: typeConnection,
  };
  articles.push(article);

  res.status(201).json(article);
});

app.put("/api/articles/:id", (req, res) => {
  // Destructuring
  const { nameGame, typeOf, typeConnection } = req.body;

  const indexArticle = articles.findIndex(
    (e) => e.id === Number(req.params.id)
  );

  articles[indexArticle] = {
    id: Number(req.params.id),
    nameGame: nameGame,
    typeOf: typeOf,
    typeConnection: typeConnection,
  };

  res.status(200).json(articles[indexArticle]);
});

app.delete("/api/articles/:id", (req, res) => {
  const indexArticle = articles.findIndex(
    (e) => e.id === Number(req.params.id)
  );

  articles.splice(indexArticle, 1);

  res.status(200).json({
    message: `Article with ID ${req.params.id} is deleted`,
  });
});

app.listen(port, () => {
  console.log(`Listening on https://localhost:${port}`);
});
