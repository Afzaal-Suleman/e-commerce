const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routesProduct = require('./routes/Product');
const routesCart = require('./routes/Cart');
const routesUser = require('./routes/User');
const routesOrder = require('./routes/Order');
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
//soxh bkrb hfno awhs



// Middleware

app.use(cookieParser());    // to parse cookies
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());    // to parse req.body
app.use(express.static('public')); // to serve static files
// app.use((req, res, next) => {
//   console.log('Request Cookies:', req.cookies);
//   next();
// });
// Routes
app.use('/products', routesProduct.router);
app.use('/cart', routesCart.routerCart);
app.use('/user', routesUser.userRouter);
app.use('/order', routesOrder.routerOrder);

// Connect to the database and start the server
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log('db connected');
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
