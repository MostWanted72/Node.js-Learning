const Product = require('../modals/product');

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    path: "/admin/add-product",
    docTitle: "My Products",
    activeProduct: true,
    productCSS: true
  });

  // res.sendFile(path.join(routeDir, "views", "add-product.html"));

  // Allows the request to continue to next middleware in line
  // next();
}

exports.getProduct = (req, res, next) => {
  const products = Product.fetchAll()
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true
  });
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
}