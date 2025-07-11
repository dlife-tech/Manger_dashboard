// ✅ utils/email.js

const nodemailer = require("nodemailer");
require("dotenv").config();

const email = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      family: 4, // ✅ Force IPv4 to avoid IPv6 issues
    },
  });

  const mailOptions = {
    from: `"WEBDEV WARRIORS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Email send error:", err.message);
  }
};

module.exports = email;
