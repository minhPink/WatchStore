const productHelper = require("./product");

module.exports.orderTotalPrice = (order) => {
  const orderTotal = order.products.reduce((sum, product) => {
    const priceAfterDiscount = productHelper.priceNewProduct(product);
    return sum + priceAfterDiscount * product.quantity;
  }, 0);
  return orderTotal;
};
