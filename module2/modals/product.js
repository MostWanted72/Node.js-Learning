const fs = require("fs");
const path = require("path");

const Cart = require("./cart");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileContent));
  });
};

const writeProductsToFile = (products) => {
  fs.writeFile(filePath, JSON.stringify(products), (err) => {
    console.log(err);
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        writeProductsToFile(updatedProducts);
      } else {
        this.id = Math.random().toString();
        products.push(this);
        writeProductsToFile(products);
      }
    });
  }

  static fetchAll(callback) {
    return getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteProduct(id) {
    getProductsFromFile((products) => {
      Product.getProductPriceById(id, (productPrice) => {
        Cart.deleteProductFromCart(id, productPrice);
        const updatedProducts = products.filter((prod) => prod.id !== id);
        writeProductsToFile(updatedProducts);
      });
    });
  }

  static getProductPriceById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callback(product.price);
    });
  }
};
