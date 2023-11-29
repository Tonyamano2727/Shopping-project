const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const Sendemail = asyncHandler(async ({ email, html }) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.Sendemail({
        from: '"Cuahangdientu" <no-relply@cuahangdientu.com>', // sender address
        to: email, // list of receivers
        subject: "Forgot password", // Subject line
        html: html, // html body
    });
    return info
})

module.exports = Sendemail