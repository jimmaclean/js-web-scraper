const fs = require("fs");
const cheerio = require("cheerio");
const getText = require("./utils");

const RS_SOUNDBARS =
  "https://www.richersounds.com/home-cinema/speakers-soundbars/soundbars.html";

const data = [];

(async () => {
  for (let index = 1; index <= 7; index++) {
    await scrapePage(`?p=${index}`);
  }

  if (data) {
    fs.writeFile("soundbars.json", JSON.stringify(data, null, 2), () => {});
  }
})();

async function scrapePage(urlSuffix) {
  const response = await fetch(RS_SOUNDBARS + urlSuffix, {
    method: "GET",
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  const selector = "#product-listing li";

  $(selector).each(function (_, element) {
    const product = $(element);
    const productData = {
      name: getText(
        product,
        ".product.name.product-item-name > .product-item-link"
      ),
      url: product
        .find(".product.name.product-item-name > .product-item-link")
        .attr("href"),
      price: getText(product, ".price:first"),
      thumbnail: product.find("img.product-image-photo").attr("src"),
    };
    data.push(productData);
  });
}
