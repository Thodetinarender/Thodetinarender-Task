const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const errorcontrollers = require('./controllers/404')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoates = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes = require('./routes/contactus');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoates);
app.use(shopRoutes);
app.use(contactRoutes);

app.use(errorcontrollers.Page404);

app.listen(3000);
