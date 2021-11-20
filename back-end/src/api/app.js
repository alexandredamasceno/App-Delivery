const express = require('express');
const cors = require('cors');
const path = require('path');

const middlewareError = require('../middlewares/error');
const loginRoute = require('../routes/loginRoute');
const userRegisterRoute = require('../routes/userRegisterRoute');
const productsRoute = require('../routes/productsRoute');
const saleProductsRoute = require('../routes/saleProductsRoute');

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use('/login', loginRoute);
app.use('/register', userRegisterRoute);
app.use('/products', productsRoute);
app.use('/saleProducts', saleProductsRoute);

app.use(middlewareError);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
