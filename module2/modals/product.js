const fs = require("fs");
const path = require("path");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      writeProductsToFile(products);
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
};
