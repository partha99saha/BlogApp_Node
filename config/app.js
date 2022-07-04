const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();
const fileHandler = require('./fileHandler');
app.use(cors());
require('./dbConfig'); // database connection
const authRoutes = require('../routes/auth');
const feedRoutes = require('../routes/feed');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({}));

app.use(bodyParser.json());

app.use(multer(
  { storage: fileHandler.fileStorage, fileFilter: fileHandler.fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

module.exports = app;
