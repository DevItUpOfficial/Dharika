const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (to, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/api/auth/verify-email/${token}`; //broo we will change this to the actual client URL later

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your email",
    html: `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`,
  });
};
