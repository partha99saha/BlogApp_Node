const mongoose = require('mongoose');
const logger = require("../util/logger")
const path = require('path');
require('dotenv').config({path:path.join(__dirname, `/.env`)})

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("DB Connected");
        logger.info("DB Connected");
    }).catch((err) => {
        console.log(err);
        console.log("DB connection error");
    })