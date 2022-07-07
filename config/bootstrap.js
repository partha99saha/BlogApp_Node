const path = require('path');
require('dotenv').config({path:path.join(__dirname, `/.env`)})

exports.port = process.env.port;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.email = process.env.email;
exports.password = process.env.password;
exports.React_HOST = process.env.React_HOST;
