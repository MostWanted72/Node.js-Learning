const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// because we are not using next() here, the middleware will stop after the excuations
// response for url path /add-products
// /admin/add-products   ===> GET
router.get("/add-product", adminController.getAddProduct);

router.get("/products", adminController.getProduct);

// /admin/product   ===> POST
// same as app.use but only handle post requests.
router.post("/product", adminController.postAddProduct);

module.exports = router;
