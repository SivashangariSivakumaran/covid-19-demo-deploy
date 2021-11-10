const nodemailer = require('nodemailer')
// 1. CREATE TRANSPORTER
// 2. DEFINE EMAIL OPTIONS
// 3  SEND EMAIL
const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASS
        }
    })
    // const transport = nodemailer.createTransport({
    //     host: process.env.MAILTRAP_HOST,
    //     port: process.env.MAILTRAP_PORT,
    //     auth: {
    //       user: process.env.MAILTRAP_USER,
    //       pass: process.env.MAILTRAP_PASS
    //     }
    //   });
    const mailOptions={
        from:'CrypterzLk <crypterlk@gmail.com>',
        to:options.email,
        subject:options.subject,
        text:options.text
    }
    await transport.sendMail(mailOptions)
}
module.exports=sendEmail