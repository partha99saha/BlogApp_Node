const mongoose = require('mongoose');
const logger = require("../util/logger");
const bootstrap =require('./bootstrap');

const MONGODB_URI = bootstrap.MONGO_ATLAS;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("DB Connected");
        logger.info("DB Connected");
    }).catch((err) => {
        console.log(err);
        console.log("DB connection error");
    })