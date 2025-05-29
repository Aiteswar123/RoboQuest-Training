const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aiedu0908@gmail.com",
    pass: "zuji ctti ioxb ucqb"
  }
});

exports.sendBookingConfirmation = functions.firestore
  .document("bookings/{id}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const mailOptions = {
      from: "Booking App <aiedu0908@gmail.com>",
      to: data.email,
      subject: "Booking Confirmation",
      text: `Hi, your group "${data.group}" is confirmed for the ${data.session} session on ${data.date}.`
    };
    return transporter.sendMail(mailOptions);
  });
