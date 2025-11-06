const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const productHelper = require("../../helpers/product");
const orderHelper = require("../../helpers/order");

// [GET] admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    order: {
      total: 0,
      success: 0,
      refuse: 0,
    },
  };
  statistic.categoryProduct.total = await ProductCategory.countDocuments({
    deleted: false,
  });
  statistic.categoryProduct.active = await ProductCategory.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
    deleted: false,
    status: "inactive",
  });

  statistic.product.total = await Product.countDocuments({
    deleted: false,
  });
  statistic.product.active = await Product.countDocuments({
    deleted: false,
    status: "active",
  });
  statistic.product.inactive = await Product.countDocuments({
    deleted: false,
    status: "inactive",
  });

  statistic.order.total = await Order.countDocuments({});
  statistic.order.success = await Order.countDocuments({
    deleted: false,
    status: "success",
  });
  statistic.order.refuse = await Order.countDocuments({
    deleted: false,
    status: "refuse",
  });

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

  let completedOrders = await Order.find({
    deleted: false,
    status: "success",
  });

  const totalRevenue = completedOrders.reduce((acc, order) => {
    const orderTotal = orderHelper.orderTotalPrice(order);
    return acc + orderTotal;
  }, 0);

  const monthlyRevenue = Array(12).fill(0);

  completedOrders.forEach((order) => {
    const month = order.updatedAt.getMonth();

    const orderTotal = orderHelper.orderTotalPrice(order);

    monthlyRevenue[month] += orderTotal;
  });

  res.render("admin/pages/dashboard/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic,
    productFeatured: productFeatured,
    totalRevenue: totalRevenue,
    monthlyRevenue: monthlyRevenue,
  });
};
