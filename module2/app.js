const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const expressHandleBars = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const pageNotFoundController = require('./controllers/pageNotFound');

const app = express();

// app.engine(
//   "hbs",
//   expressHandleBars({
//     layoutsDir: "views/layout/",
//     defaultLayout: "main-layout",
//     extname: 'hbs'
//   })
// ); // handlebars needs to be specifically mentioned seperately compared to pug as it does not comes built in express to handle it.

// app.set() functions allows us to set global variables acroos our app, but certain variable are predifined such "view engine" to set template engine and "views" for the folder where our html files are.
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // express.static is a middleware which serves static files, like css, images etc

app.use("/admin", adminRoutes);
app.use(shopRoute);

app.use(pageNotFoundController.pageNotFound);

app.listen(3000);
