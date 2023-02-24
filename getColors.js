const axios = require("axios");
const cheerio = require("cheerio");

const pageUrl = "https://fr.wikipedia.org/wiki/Liste_de_noms_de_couleur";

async function getColors() {
  const { data } = await axios.get(pageUrl);
  const $ = cheerio.load(data);
  const table = $("table");
  // console.log(table);
  const colors = [];

  table
    .find("tbody tr")
    .slice(2)
    .each((i, el) => {
      const $row = $(el);
      const color = {};
      color.name = $row.find("td").first().text().trim();
      const labels = ["name", "hexa", "rvb", "cmjn", "tsl"];
      const columns = $row.find("td");
      // console.log(columns.length);
      color.hexa =
        $row.find("td:nth-child(3)").text().trim() +
        $row.find("td:nth-child(4)").text().trim() +
        $row.find("td:nth-child(5)").text().trim() +
        $row.find("td:nth-child(6)").text().trim();

      color.rvb =
        $row.find("td:nth-child(7)").text().trim() +
        "," +
        $row.find("td:nth-child(8)").text().trim() +
        "," +
        $row.find("td:nth-child(9)").text().trim();

      color.cmjn =
        $row.find("td:nth-child(10)").text().trim() +
        "," +
        $row.find("td:nth-child(11)").text().trim() +
        "," +
        $row.find("td:nth-child(12)").text().trim() +
        "," +
        $row.find("td:nth-child(13)").text().trim();

      color.tsl =
        $row.find("td:nth-child(14)").text().trim() +
        "," +
        $row.find("td:nth-child(15)").text().trim() +
        "," +
        $row.find("td:nth-child(16)").text().trim();

      colors.push(color);
    });
  // console.log(colors);

  return colors;
}

module.exports = getColors;
