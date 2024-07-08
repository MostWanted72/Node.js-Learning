const Product = require("../modals/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    docTitle: "My Products",
    editMode: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.Product("/");
  }

  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      docTitle: "My Products",
      editMode,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updasteImageUrl = req.body.imageUrl;
  const updastedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const productId = req.body.productId;

  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updasteImageUrl,
    updatedDescription,
    updastedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteProduct(productId);
  res.redirect("/admin/products");
};

exports.getProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
