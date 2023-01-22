const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
require('./connection')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: {
  origin : `${process.env.BACKEND}`,
  methods: ['GET', 'POST', 'PATCH', "DELETE"],
  transports: ['websocket']
  }
});


const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./frontend/build'));
  const path= require("path");
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} 

app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
   }
})

const PORT = process.env.PORT || '8080'

server.listen(PORT, ()=> {
  console.log(`server running at port ${PORT}`)
})

app.set('socketio', io);