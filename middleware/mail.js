require("dotenv").config({path:path.join(__dirname,'./', 'config', `/.env`)});
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let sendMail = (mailOptions) => {
  mailTransporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Email Not Sended!");
      console.log(err);
    } else {
      console.log("Email sent successfully!");
    }
  });
};

module.exports = sendMail;