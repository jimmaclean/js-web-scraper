const fs = require("fs").promises;
const cheerio = require("cheerio");
const getText = require("./utils");

(async () => {
  const baseData = await fs
    .readFile("soundbars.json")
    .then((bin) => JSON.parse(bin));

  const brands = await fs
    .readFile("brands.json")
    .then((bin) => JSON.parse(bin));

  baseData.map((item) => {
    const match = brands.find((brand) => {
      const lowerName = item.name.toLowerCase();
      const lowerBrand = brand.toLowerCase();
      return lowerName.includes(lowerBrand);
    });
    item.brand = match;
  });

  //   const response = await fetch(item.url, { method: "GET" });
  //   const html = await response.text();
  //   const $ = cheerio.load(html);
  fs.writeFile("soundbars-more.json", JSON.stringify(baseData, null, 2));
})();
