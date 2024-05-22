const fs = require("fs").promises;

(async () => {
  const data = await fs
    .readFile("soundbars.json")
    .then((bin) => JSON.parse(bin));

  const brands = await fs
    .readFile("brands.json")
    .then((bin) => JSON.parse(bin));

  data.map((item) => {
    const match = brands.find((brand) => {
      const lowerName = item.name.toLowerCase();
      const lowerBrand = brand.toLowerCase();

      return lowerName.includes(lowerBrand);
    });

    item.brand = match;
  });

  fs.writeFile("soundbars-more.json", JSON.stringify(data, null, 2));
})();
