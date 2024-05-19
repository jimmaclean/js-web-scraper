const fs = require("fs");
const cheerio = require("cheerio");
const { get } = require("https");

const RS_SOUNDBARS =
  "https://www.richersounds.com/home-cinema/speakers-soundbars/soundbars.html";

(async () => {
  const response = await fetch(RS_SOUNDBARS, {
    method: "GET",
  });

  const html = await response.text();
  const $ = cheerio.load(html);

  const selector = "#product-listing li";
  const data = [];

  $(selector).each(function (i, element) {
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
    };
    data.push(productData);
  });

  if (data && typeof data === "object") {
    fs.writeFile("product.json", JSON.stringify(data, null, 2), () => {});
  }
})();

function getText($, selector) {
  if ($.length === 0) return null;

  return $.find(selector).text().trim();
}
