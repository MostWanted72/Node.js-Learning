const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressHandleBars = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

app.engine(
  "hbs",
  expressHandleBars({
    layoutsDir: "views/layout/",
    defaultLayout: "main-layout",
    extname: 'hbs'
  })
); // handlebars needs to be specifically mentioned seperately compared to pug as it does not comes built in express to handle it.

// app.set() functions allows us to set global variables acroos our app, but certain variable are predifined such "view engine" to set template engine and "views" for the folder where our html files are.
app.set("view engine", "hbs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // express.static is a middleware which serves static files, like css, images etc

app.use("/admin", adminData.route);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).render("page-not-found", { docTitle: "Page Not Found" });
  // res
  //   .status(404)
  //   .sendFile(path.join(__dirname, "views", "page-not-found.html"));
});

app.listen(3000);
