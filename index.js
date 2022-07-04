const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config({ path: path.join(__dirname, './', 'config', '.env') })
const fileHandler = require('./config/fileHandler');
const port = process.env.port;
const app = express();

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());
app.use(multer(
    { storage: fileHandler.fileStorage, fileFilter: fileHandler.fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

require('./config/dbConfig');
const server = app.listen(port);
console.log(`server is running on: http://localhost:${port}`);
const io = require('./util/socket').init(server);
io.on('connection', (socket) => {
    console.log('socket.io Conected');
})
