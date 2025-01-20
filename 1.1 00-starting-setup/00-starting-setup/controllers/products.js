
const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct =(req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProucts=(req, res, next) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};

exports.getContactUs=(req, res, next) => {
  res.render('contactus', {
    pageTitle: 'ContactUs',
    path: '/contactus',
    formsCSS: true,
    activeContactUs: true,
    productCSS: true
  });
};

exports.postContact = (req, res, next) => {
  const { name, email } = req.body; // Extract name and email from the form data.
  console.log(`Contact Submission - Name: ${name}, Email: ${email}`);

  // Redirect to a success page after submission.
  res.redirect('/success');
};

exports.getSuccess = (req, res, next) => {
  res.render('success', {
    pageTitle: 'Contact Success',
    path: '/success'
  });
};
