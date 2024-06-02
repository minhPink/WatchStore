const categoryMiddleware = require("../../middlewares/client/category.middleware");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

const usertMiddleware = require("../../middlewares/client/user.middleware");

const settingGeneralMiddleware = require("../../middlewares/client/setting.middleware");

const homeRouter  = require("./home.route");
const productRouter = require("./product.route");
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route");
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route");

module.exports = (app) => {

    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cartId);

    app.use(usertMiddleware.infoUser);

    app.use(settingGeneralMiddleware.settingGeneral);

    app.use("/",  homeRouter);
    
    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cartRouter);

    app.use("/checkout", checkoutRouter);

    app.use("/user", userRouter);
}