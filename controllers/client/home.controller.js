const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
const formSelectHelper = require("../../helpers/formSelect");
//[GET] /
module.exports.index = async (req, res) => {
  let sortSold = {
    sold: "desc",
  };
  // Lay ra san pham noi bat
  const productFeatured = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort(sortSold)
    .limit(4);

  const featuredProductIds = productFeatured.map((product) => product._id);
  await Product.updateMany(
    { _id: { $in: featuredProductIds } },
    { $set: { featured: "1" } }
  );

  await Product.updateMany(
    { _id: { $nin: featuredProductIds } },
    { $set: { featured: "0" } }
  );

  const newProducts = productHelper.priceNewProducts(productFeatured);

  // Lay ra san pham moi nhat

  //sort-select
  // let sort = formSelectHelper(req);

  // const productsNew = await Product.find({
  //   deleted: false,
  //   status: "active",
  // })
  //   .sort(sort)
  //   .limit(20);

  // const newProductsNew = productHelper.priceNewProducts(productsNew);

  // button-price-filter
  const query = { deleted: false, status: "active" };
  const priceFilter = req.query.price || "";

  // Lọc giá
  if (priceFilter === "under-10") {
    query.price = { $lt: 10_000_000 };
  } else if (priceFilter === "10-30") {
    query.price = { $gte: 10_000_000, $lte: 30_000_000 };
  } else if (priceFilter === "above-30") {
    query.price = { $gt: 30_000_000 };
  } else if (priceFilter === "sale") {
    query.discountPercentage = { $gt: 0 };
  }

  const sort = formSelectHelper(req);
  const products = await Product.find(query).sort(sort);
  const newProductsNew = productHelper.priceNewProducts(products);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts,
    productsNew: newProductsNew,
  });
};
