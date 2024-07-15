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
  req.user
    .getProducts({ where: { id: productId } })
    .then((product) => {
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        docTitle: "My Products",
        editMode,
        product: product[0],
      });
    })
    .catch((err) => {
      console.log(err);
      return res.redirect("/");
    });
};

exports.postEditProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updasteImageUrl = req.body.imageUrl;
  const updastedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const productId = req.body.productId;

  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.description = updatedDescription;
      product.price = updastedPrice;
      product.imageUrl = updasteImageUrl;
      return product.save();
    })
    .then(() => res.redirect("/admin/products"))
    .catch((error) => console.log(error));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title,
      price,
      imageUrl,
      description,
    })
    .then((result) => res.redirect("/admin/products"))
    .catch((error) => console.log("check error", error));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => res.redirect("/admin/products"));
};

exports.getProduct = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
