function getText($, selector) {
  if ($.length === 0) return null;

  return $.find(selector).text().trim();
}

module.exports = getText;
