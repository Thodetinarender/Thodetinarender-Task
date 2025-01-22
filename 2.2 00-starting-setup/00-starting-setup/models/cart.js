const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json' // Ensure this file exists or is created if not
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; // Default cart structure

      // Parse existing cart if no error
      if (!err && fileContent.length > 0) {
        try {
          cart = JSON.parse(fileContent);
        } catch (parseErr) {
          console.error("Error parsing cart.json:", parseErr);
        }
      }

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = existingProductIndex >= 0 ? cart.products[existingProductIndex] : null;
      let updatedProduct;

      // Add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      // Update total price
      cart.totalPrice += +productPrice;

      // Write updated cart back to file
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          console.error("Error writing to cart.json:", err);
        }
      });
    });
  }
};
