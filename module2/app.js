const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const pageNotFoundController = require("./controllers/pageNotFound");
const sequelize = require("./utils/database");

const Product = require("./modals/product");
const User = require("./modals/user");
const { constants } = require("buffer");

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

Product.belongsTo(User, { constants: true, onDelete: "CASCADE" });
User.hasMany(Product);

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
    console.log(user);
    app.listen(3000);
  })
  .catch((error) => console.log("sequelize error", error));
