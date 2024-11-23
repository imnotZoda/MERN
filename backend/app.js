const express = require('express');
const app = express();
const cors = require('cors');

//config
app.use(express.json());
app.use(cors()); // to enable other origin to access our data

//import routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

//use routes
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/order', orderRoutes)

module.exports = app;