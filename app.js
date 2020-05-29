// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

// PORT
const PORT = process.env.PORT || 3000;

// DATABASE
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nodeapi'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('db connected'); })

// DATABASE - error / success
db.on('error', (err) => { console.log('db connection error:', err.message); })
db.on('connected', () => { console.log('mongo connected:', MONGODB_URI); })
db.on('disconnected', () => { console.log('mongo disconnected'); })
db.on('open', () => { })

// import routes
const postRoutes = require('./routes/post');

// middleware
app.use(morgan('dev'));

//change app.get to app.use to use routes as middleware
// app.js --> routes --> controllers
app.use('/', postRoutes);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})





// // we can create our own middleware
// const myOwnMiddleware = (req, res, next) => {
//   console.log('middleware applied.');
//   next(); // application will continue to next phase in event loop instead of hang
// }

// middleware
// app.use(myOwnMiddleware)

// for authentication could do something like: 
// app.get('/', myOwnMiddleware, getPosts)
// where authent occurs in middleware