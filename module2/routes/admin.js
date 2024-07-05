const express = require("express");

const productsController = require('../controllers/products');

const router = express.Router();

// because we are not using next() here, the middleware will stop after the excuations
// response for url path /add-products
// /admin/add-products   ===> GET
router.get("/add-product", productsController.getAddProduct);

// /admin/product   ===> POST
// same as app.use but only handle post requests.
router.post("/product", productsController.postAddProduct);

module.exports = router;