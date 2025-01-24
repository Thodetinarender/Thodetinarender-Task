const e = require('express');
const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id =id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
       else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  
//   static findById(id,cb){
//   getProductsFromFile(products =>{
//     const product =products.find(p => p.id ===id);
//     cb(product); 
//   })
// }

static findById(id, cb) {
  getProductsFromFile(products => {
    console.log('Looking for ID (type):', id, typeof id);
    console.log('Available products:', products);
    const product = products.find(p => {
      console.log('Comparing:', p.id, typeof p.id, 'with', id, typeof id);
      return p.id === id.toString();
    });
    console.log('Found product:', product);
    cb(product);
  });
}


static deleteProductById(id, cb){
  getProductsFromFile(products =>{
    const updatedProducts = products.filter(prod => prod.id !==id);
    fs.writeFile(p, JSON.stringify(updatedProducts),err =>{
      if(err){
        console.log(err);
      }else{
        cb();
      }
    })

  })
}

};
