const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expense');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/expense', expenseRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

sequelize.sync()
    .then(result => {
        console.log('Database synced');
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
