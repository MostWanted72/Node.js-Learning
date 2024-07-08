const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

const readCartFile = (callback) =>
  fs.readFile(filePath, (err, fileContent) => {
    let cart = { products: [], totalPrice: 0 };
    if (!err) {
      cart = JSON.parse(fileContent);
    }
    return callback(cart);
  });

module.exports = class Cart {
  static addProduct(id, productPrice) {
    readCartFile((cart) => {
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      let updatedCart;
      let existingProduct;

      if (existingProductIndex !== -1) {
        existingProduct = cart.products[existingProductIndex];
      }

      if (existingProduct) {
        updatedCart = { ...existingProduct };
        updatedCart.qty += 1;
        cart.products[existingProductIndex] = updatedCart;
      } else {
        updatedCart = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedCart];
      }
      cart.totalPrice += Number(productPrice);

      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
