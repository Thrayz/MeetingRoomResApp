const nodemailer = require('nodemailer');
const { env } = require('process');
require('dotenv').config();


async function sendEmail(subject, text) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.host,
            port: process.env.port, 
            auth: {
                user: process.env.user,
                pass: process.env.pass
            }
        });

        const mailOptions = {
            from: process.env.from,
            to: process.env.email,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail };
