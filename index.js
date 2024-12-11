const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');

// Imported Routes
const itemsRoute = require('./server/routes/inventoryRoutes');

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Execute Routes
app.use('/', itemsRoute);

app.listen(3001, () => {
    console.log("Serving on port 3001.");
})