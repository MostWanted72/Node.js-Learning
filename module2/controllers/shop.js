const Product = require('../modals/product');
const Cart = require('../modals/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        docTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(error => console.log('error in fetching', error))
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId).then((product) => {
    res.render('shop/product-details', {
      product: product,
      docTitle: product.title,
      path: '/products',
    });
  });
  
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId).then(([product]) =>
    Cart.addProduct(productId, product[0].price)
  );
  res.redirect('/');
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        docTitle: 'Shop',
        path: '/',
      });
    })
    .catch(error => console.log('error in fetching', error))
};

exports.getCart = (req, res, next) => {
  Cart.getAllProductsFromCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let i = 0; i < cart.products.length; i += 1) {
        const ctProd = products.filter(
          (prod) => cart.products[i].id === prod.id
        );

        cartProducts.push({
          ...ctProd[0],
          qty: cart.products[i].qty,
        });
      }
      res.render('shop/cart', {
        path: '/cart',
        docTitle: 'Your Cart',
        cart: cartProducts,
      });
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    docTitle: 'Your Orders',
  });
};

exports.checkout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    docTitle: 'Checkout',
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  const productPrice = req.body.productPrice;
  if ((productId, productPrice)) {
    Cart.deleteProductFromCart(productId, productPrice);
    res.redirect('/cart');
  }
};
