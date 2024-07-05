const express = require("express");
const path = require("path");

const routeDir = require("../utils/path");
const adminDasta = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // for rendering pug, since we have already let express know are views with app.set(), we do not need to specify file path,
  const products = adminDasta.products;
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true
  });

  // for rendering normal html
  // res.sendFile(path.join(routeDir, 'views', 'shop.html'))
});

module.exports = router;
