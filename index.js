const express = require("express");
const getColors = require("./getColors");

const app = express();

app.use(express.static("public")); // Permet de Fournir un serveur statique avec les infos du dossier public

app.get("/api/colors", async (req, res) => {
  const colors = await getColors();
  res.json(colors);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
