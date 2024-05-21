const fs = require("fs").promises;
const cheerio = require("cheerio");

(async () => {
  const html = await fs.readFile("brands.html");
  const data = await readLabels(html);
  fs.writeFile("brands.json", JSON.stringify(data, null, 2), () => {});
})();

async function readLabels(html) {
  const data = [];
  const $ = cheerio.load(html);
  $("label").each(function () {
    const brand = $(this);
    data.push(brand.text().trim());
  });
  console.log(data);
  return Promise.resolve(data);
}
