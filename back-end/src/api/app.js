const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }, 
});

const { updateSaleStatus } = require('../services/sales');

io.on('connection', async (socket) => {
  socket.on('statusChange', async (order) => {
    // console.log('Front: ', order);
    if (!order.id === '' && !order.status === '') {
      const bdStatus = await updateSaleStatus(order);
      io.emit('newStatus', { newStatus: bdStatus });
    }
  });

  socket.on('Entregue', async (order) => {
    console.log('Front: ', order);
    // if (!order.id === '' && !order.status === '') {
      const bdStatus = await updateSaleStatus(order);
      console.log('bsStatus: ', bdStatus);
     
      io.emit('newStatus', { newStatus: bdStatus });
    // }
  });
});

const middlewareError = require('../middlewares/error');
const loginRoute = require('../routes/loginRoute');
const userRegisterRoute = require('../routes/userRegisterRoute');
const productsRoute = require('../routes/productsRoute');
const salesRoute = require('../routes/salesRoute');
const saleProductsRoute = require('../routes/saleProductsRoute');
const usersRoute = require('../routes/usersRoute'); 

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(cors());
app.use('/login', loginRoute);
app.use('/register', userRegisterRoute);
app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use('/users/search', usersRoute);
app.use('/saleProducts', saleProductsRoute);

app.use(middlewareError);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = http;
