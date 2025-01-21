
const fs = require('fs');
const path = require('path');

module.exports = class Product{
    constructor(t){
        this.title = t;
    }
    save() {
      const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'products.json'
       );
       fs.readFile(p, (error, fileContent)=>{
        let products=[];
        if(!error){
            products = JSON.parse(fileContent);
        }
        products.push(this);
        fs.writeFile(p, JSON.stringify(products),(error)=>{
            console.log(error);
        });
       });
   }

   static fetchAll(cb){
     const p = path.join(path.dirname(process.mainModule.filename),
        'data',
        'products.json'
       );
     fs.readFile(p, (error, fileContent)=>{
        if(error){
            cb([]);
        }
        cb(JSON.parse(fileContent));
     })
   }

}