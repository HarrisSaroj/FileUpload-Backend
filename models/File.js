const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
});

// Post Middleware  

// doc--> Jo Database mai save hai ussi ko DOC bola hai
fileSchema.post("save", async function(doc){
    try {
        console.log("DOC->", doc)   

        //1--> Transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // Send Mail
        let info = await transporter.sendMail({
            from: `HarendraSaroj`,
            to: doc.email,
            subject: `Your Credential is been Exposed by Hacker`,
            html: `<h2>Hi, Stranger here</h2> <p>Kamal laudya</p>`
        });

        console.log("INFO-->", info);
    } 
    catch (error) {
        console.error(error);
    }
});

const File = mongoose.model('File', fileSchema);
module.exports = File;