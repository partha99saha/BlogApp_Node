const nodemailer = require("nodemailer");
const bootstrap = require('../config/bootstrap');

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: bootstrap.email,
    pass: bootstrap.password,
  },
});

let sendMail = (mailOptions) => {
  mailTransporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Email Not Sent!");
      console.log(err);
    } else {
      console.log("Email sent successfully!");
    }
  });
};

module.exports = sendMail;