const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Connection to DB
const {connectionToDB} = require("./config/connection");
connectionToDB();

// Json Parser
const fileupload = require("express-fileupload");
app.use(express.json());
// app.use(express.urlencoded());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Connect to CLoudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Routes
const Upload = require('./routes/FileUpload')
app.use('/api/v1/upload', Upload);


// Dummy Routes
app.get("/", (req, res) => {
    res.send("Harendra");
})

// Server Initiated 
app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})