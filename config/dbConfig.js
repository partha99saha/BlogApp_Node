const mongoose = require('mongoose');
const logger = require("../util/logger")
const bootstrap =require('./bootstrap');

const MONGODB_URI = bootstrap.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("DB Connected");
        logger.info("DB Connected");
    }).catch((err) => {
        console.log(err);
        console.log("DB connection error");
    })