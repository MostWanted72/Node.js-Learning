const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const pageNotFoundController = require("./controllers/pageNotFound");
const sequelize = require("./utils/database");

const Product = require("./modals/product");
const User = require("./modals/user");
const Cart = require("./modals/cart");
const CArtItem = require("./modals/cart-item");
const CartItem = require("./modals/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // express.static is a middleware which serves static files, like css, images etc

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoute);

app.use(pageNotFoundController.pageNotFound);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Nanna", email: "Nanna@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    console.log("check this part", user);
    return user.createCzrt();
  })
  .then(() => app.listen(3000))
  .catch((error) => console.log("sequelize error", error));
