module.exports = (req) => {
  let sort = {};
  const priceFilter = req.query.price;

  if (priceFilter === "sale") {
    sort.discountPercentage = -1;
  } else if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = -1;
  }

  return sort;
};
