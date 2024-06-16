const mongoose = require('mongoose');
require("dotenv").config();

exports.connectionToDB = () => {

    const DB_URL = process.env.DB_URL;

    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database"))
    .catch((error) => {
        console.log("Failed to connect to database");
        console.log(error);
        process.exit(1);
    })
}



