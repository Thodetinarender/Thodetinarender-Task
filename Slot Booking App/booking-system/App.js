const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/db');
const bookingRoutes = require('./routes/bookingRoutes');
const { User, Slot, Booking } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Sync database
sequelize
  .sync()
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => console.log(err));

// Routes
app.use('/', bookingRoutes);  // This connects the root route to the routes defined in bookingRoutes.js

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
