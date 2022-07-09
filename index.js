const path = require('path');
//const fs = require('fs');
//const https = require('https');
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { serverErrorHandler, pageNotFoundError } =
    require('./middleware/errorHandling');
const bootstrap = require('./config/bootstrap');
const fileHandler = require('./config/fileHandler');
const app = express();

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

//const privateKey = fs.readFileSync('server.key');
//const certificate = fs.readFileSync('server.cert');

app.use(cors());
require('./config/dbConfig');

app.use(bodyParser.json());
app.use(multer({
    storage: fileHandler.fileStorage,
    fileFilter: fileHandler.fileFilter
}).single('image'));
app.use('/images', express
    .static(path.join(__dirname, 'images')));

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use(serverErrorHandler);
app.use(pageNotFoundError);
app.use(helmet());

const port = bootstrap.port;
const server =
    app.listen(port);
// https.createServer(
//     {
//         key: privateKey,
//         cert: certificate
//     },app).listen(port);
console.log(`server is running on: ${port}`);
const io = require('./util/socket').init(server);
io.on('connection', () => {
    console.log('socket.io Conected');
})
