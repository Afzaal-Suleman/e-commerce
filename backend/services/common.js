const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()
console.log(process.env.MAIL_PASSWORD);

transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "afzaaladi48@gmail.com",
        pass: process.env.MAIL_PASSWORD,
    },
})

exports.sendMail = async ({ to, subject, text, html }) => {
    
    try {
        let info = await transporter.sendMail({
            from: '"E-commerce" <afzaal48@gmail.com>', // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        return info; // Return the information about the sent email
    } catch (error) {
        console.error("Error sending email:", error); // Log the error for debugging
        throw error; // Re-throw the error to be handled by the calling function
    }
}
