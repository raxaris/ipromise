const nodemailer = require('nodemailer');
const e = require("express");
const ApiError = require("../error/apiError");
const emailAddress = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: emailAddress,
        pass: emailPassword
    },
    secure: true
});

const sendResetEmail = async (email, token, next) => {
    console.log(emailPassword);
    console.log(emailAddress);
    console.log(email);

    const mailOptions = {
        from: emailAddress,
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://localhost:3000/auth/reset/${token}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (e) {
        console.error('Error sending password reset email:', e);
        next(ApiError.internal(e.message))
    }
};

module.exports = sendResetEmail;