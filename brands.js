const fs = require("fs").promises;
const cheerio = require("cheerio");

(async () => {
  const data = [];
  const html = await fs.readFile("brands.html");
  const $ = cheerio.load(html);

  $("label").each(function () {
    const brand = $(this);
    data.push(brand.text().trim());
  });

  fs.writeFile("brands.json", JSON.stringify(data, null, 2), () => {});
})();
